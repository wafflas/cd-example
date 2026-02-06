import React, { useState, useEffect, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const GameBridge: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [discLoading, setDiscLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wasmError, setWasmError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // System check animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Simulate disc reading for WASM file (37MB)
  useEffect(() => {
    if (loading) return;

    let bytes = 0;
    const totalBytes = 37686550; // Actual WASM size from your game
    const interval = setInterval(() => {
      bytes += Math.random() * 500000 + 200000; // Variable read speed
      const percent = Math.min((bytes / totalBytes) * 100, 100);
      setLoadProgress(percent);

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => setDiscLoading(false), 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  // Monitor iframe for WASM loading errors
  useEffect(() => {
    if (loading || discLoading) return;

    const checkWasmLoad = () => {
      try {
        const iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow) return;

        // Listen for console errors from the iframe
        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
          const message = args.join(" ");
          if (
            message.includes("CORS") ||
            message.includes("WebAssembly") ||
            message.includes("wasm") ||
            message.includes("Cross-Origin")
          ) {
            setWasmError(true);
          }
          originalConsoleError(...args);
        };
      } catch (err) {
        console.warn("Could not monitor iframe:", err);
      }
    };

    const timer = setTimeout(checkWasmLoad, 3000);
    return () => clearTimeout(timer);
  }, [loading, discLoading]);

  const toggleFullscreen = async () => {
    try {
      const appWindow = getCurrentWindow();
      const fullscreen = await appWindow.isFullscreen();
      await appWindow.setFullscreen(!fullscreen);
      setIsFullscreen(!fullscreen);
    } catch (error) {
      console.error("Fullscreen toggle failed:", error);
    }
  };

  const systemChecks = [
    "INITIALIZING GRAPHICS ENGINE",
    "LOADING GAME ASSETS",
    "CHECKING AUDIO SUBSYSTEM",
    "CONFIGURING INPUT DEVICES",
    "ESTABLISHING GAME BRIDGE",
    "READY TO LAUNCH",
  ];

  const currentCheck = Math.min(
    Math.floor((progress / 100) * systemChecks.length),
    systemChecks.length - 1,
  );

  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="relative w-full h-full bg-void flex flex-col">
      {/* Header */}
      <div className="bg-concrete border-b-3 border-steel p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-electric text-2xl font-bold">◈</div>
          <div>
            <h2 className="text-electric font-bold tracking-wider">THE GAME</h2>
            <p className="text-fog text-xs">GODOT RUNTIME ENVIRONMENT</p>
          </div>
        </div>

        <button
          onClick={toggleFullscreen}
          className="btn-brutal text-xs"
          disabled={loading || discLoading || wasmError}
        >
          {isFullscreen ? "◱ EXIT FULLSCREEN" : "◰ FULLSCREEN"}
        </button>
      </div>

      {/* System Check Loading Screen */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-void flex items-center justify-center">
          <div className="w-96 space-y-6">
            <div className="text-center">
              <h3 className="text-electric text-2xl font-bold tracking-widest mb-2 crt-glow">
                SYSTEM CHECK
              </h3>
              <div className="text-fog text-sm">
                INITIALIZING GAME ENGINE...
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-8 bg-concrete border-3 border-steel relative overflow-hidden">
                <div
                  className="h-full bg-electric transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-void font-bold text-sm mix-blend-difference">
                    {progress}%
                  </span>
                </div>
              </div>

              <div className="text-chrome text-xs font-mono text-center animate-pulse">
                {systemChecks[currentCheck]}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {systemChecks.slice(0, -1).map((check, idx) => (
                <div
                  key={idx}
                  className={`
                    p-2 border-2 text-xs text-center
                    ${
                      idx <= currentCheck
                        ? "border-electric text-electric"
                        : "border-steel text-smoke"
                    }
                  `}
                >
                  {idx <= currentCheck ? "✓" : "○"} {check.split(" ")[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disc Loading Screen */}
      {!loading && discLoading && (
        <div className="absolute inset-0 z-40 bg-void flex items-center justify-center">
          <div className="w-96 space-y-6">
            <div className="text-center">
              <div className="text-electric text-6xl mb-4 animate-spin">◈</div>
              <h3 className="text-electric text-2xl font-bold tracking-widest mb-2 crt-glow">
                READING DISC
              </h3>
              <div className="text-fog text-sm">
                LOADING GAME DATA FROM CD-ROM...
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-8 bg-concrete border-3 border-steel relative overflow-hidden">
                <div
                  className="h-full bg-electric transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-void font-bold text-sm mix-blend-difference">
                    {Math.round(loadProgress)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-chrome text-xs font-mono">
                <span>
                  {formatBytes(37686550 * (loadProgress / 100))} /{" "}
                  {formatBytes(37686550)}
                </span>
                <span className="text-electric">READING...</span>
              </div>
            </div>

            {/* Disc access animation */}
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 ${
                    i < Math.floor((loadProgress / 100) * 16)
                      ? "bg-electric"
                      : "bg-steel"
                  } transition-colors duration-200`}
                />
              ))}
            </div>

            <div className="text-center text-smoke text-xs font-mono">
              DISC SPEED: 52X CAV
            </div>
          </div>
        </div>
      )}

      {/* WASM Error Screen */}
      {wasmError && (
        <div className="absolute inset-0 z-30 bg-void flex items-center justify-center">
          <div className="bg-concrete border-3 border-steel p-8 text-center max-w-md">
            <div className="text-electric text-4xl mb-4">⚠</div>
            <h3 className="text-electric font-bold text-xl mb-2">
              DISC READ ERROR
            </h3>
            <p className="text-fog text-sm mb-4">
              WebAssembly module failed to load. This may be due to CORS policy
              restrictions.
            </p>
            <div className="text-smoke text-xs font-mono bg-steel p-3 mb-4">
              ERROR: WASM_LOAD_FAILURE
              <br />
              STATUS: SECURITY_POLICY_BLOCK
              <br />
              LOCATION: game/game.wasm
            </div>
            <p className="text-chrome text-xs">
              Check GODOT-OFFLINE-SETUP.md for troubleshooting.
            </p>
          </div>
        </div>
      )}

      {/* Game iFrame */}
      <div className="flex-1 relative overflow-hidden">
        <iframe
          ref={iframeRef}
          src="cd-content://localhost/index.html"
          className={`w-full h-full border-0 ${loading || discLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
          title="Godot Game"
          style={{ display: "block" }}
          allow="autoplay; fullscreen; cross-origin-isolated"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {/* Footer Status */}
      <div className="bg-concrete border-t-3 border-steel p-2 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <div
            className={`status-indicator ${
              loading || discLoading || wasmError
                ? "status-inactive"
                : "status-active"
            }`}
          ></div>
          <span className="text-smoke">
            {loading
              ? "INITIALIZING"
              : discLoading
                ? "READING DISC"
                : wasmError
                  ? "ERROR DETECTED"
                  : "RUNTIME ACTIVE"}
          </span>
        </div>
        <div className="text-fog font-mono">FRAME BUFFER: 1024×768</div>
      </div>
    </div>
  );
};

export default GameBridge;
