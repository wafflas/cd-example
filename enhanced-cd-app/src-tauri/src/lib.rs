// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn get_mime_type(path: &str) -> &'static str {
    if path.ends_with(".wasm") {
        "application/wasm"
    } else if path.ends_with(".js") {
        "application/javascript"
    } else if path.ends_with(".html") {
        "text/html"
    } else if path.ends_with(".css") {
        "text/css"
    } else if path.ends_with(".png") {
        "image/png"
    } else if path.ends_with(".jpg") || path.ends_with(".jpeg") {
        "image/jpeg"
    } else if path.ends_with(".svg") {
        "image/svg+xml"
    } else if path.ends_with(".pck") {
        "application/octet-stream"
    } else if path.ends_with(".mp3") {
        "audio/mpeg"
    } else {
        "application/octet-stream"
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .register_asynchronous_uri_scheme_protocol("cd-content", |_app, request, responder| {
            tauri::async_runtime::spawn(async move {
                let uri = request.uri().to_string();
                let path = uri.strip_prefix("cd-content://localhost/").unwrap_or("");
                
                // Read file from the bundled game resources
                let resource_path = format!("game/{}", path);
                
                match std::fs::read(&resource_path) {
                    Ok(data) => {
                        let mime_type = get_mime_type(&resource_path);
                        
                        let response = tauri::http::Response::builder()
                            .header("Content-Type", mime_type)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Cross-Origin-Opener-Policy", "same-origin")
                            .header("Cross-Origin-Embedder-Policy", "require-corp")
                            .header("Cross-Origin-Resource-Policy", "cross-origin")
                            .status(200)
                            .body(data)
                            .unwrap();
                        
                        responder.respond(response);
                    }
                    Err(e) => {
                        eprintln!("Failed to read resource {}: {}", resource_path, e);
                        let response = tauri::http::Response::builder()
                            .status(404)
                            .body(Vec::new())
                            .unwrap();
                        responder.respond(response);
                    }
                }
            });
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
