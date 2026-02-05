# Enhanced CD :: White Pony Edition

A nostalgic desktop multimedia shell inspired by the Enhanced CD era (circa 2000), featuring a brutalist UI aesthetic with integrated audio player, video gallery, archives, and an embedded Godot game.

## 🎮 Features

- **Audio Player**: Vintage rack-mount CD player with VU meters and multi-format support (MP3, WAV, OGG, FLAC)
- **Video Gallery**: Retro multimedia browser
- **Archives**: File system browser for disc contents
- **The Game**: Godot HTML5 game integration with fullscreen support
- **Brutalist UI**: Industrial design with scanline overlays, monospaced fonts, and electric blue accents
- **Fixed Aspect Ratio**: Locked at 1024×768 to mimic old multimedia software

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Rust** (latest stable)
- **npm** or **yarn**

### Installation

1. Navigate to the project directory:

```powershell
cd C:\Users\giann\.gemini\antigravity\scratch\enhanced-cd-app
```

2. Install dependencies:

```powershell
npm install
```

3. Run the development build:

```powershell
npm run tauri dev
```

### Building for Production

```powershell
npm run tauri build
```

The compiled executable will be in `src-tauri/target/release/`.

## 🎨 Design Philosophy

The application features a **brutalist UI aesthetic** inspired by the year 2000:

- **Color Palette**: Deep blacks, industrial grays, electric blue accent
- **Typography**: IBM Plex Mono (monospaced throughout)
- **Visual Effects**: CRT scanlines, glow effects, heavy borders
- **Lo-fi Tech**: Mimics early 2000s multimedia software

## 🎵 Using the Audio Player

1. Click **"⊕ LOAD"** in the audio player at the bottom
2. Select an audio file (MP3, WAV, OGG, FLAC)
3. Press **"▶"** to play
4. Adjust volume with the slider
5. The player persists across all sections

## 🎮 Adding Your Godot Game

1. Export your Godot project as **HTML5**
2. Copy all exported files to `/public/game/`
3. Ensure the main file is named `index.html`
4. Reload the application
5. Navigate to **"The Game"** section
6. Use the **fullscreen toggle** for immersive gameplay

## 📁 Project Structure

```
enhanced-cd-app/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Sidebar navigation
│   │   ├── AudioPlayer.tsx      # Persistent audio player
│   │   ├── GameBridge.tsx       # Godot game integration
│   │   ├── VideoGallery.tsx     # Video section
│   │   ├── Archives.tsx         # File browser
│   │   └── AudioSection.tsx     # Audio landing page
│   ├── App.tsx                  # Main application
│   └── index.css                # Global styles + Tailwind
├── public/
│   └── game/
│       └── index.html           # Godot game export
├── src-tauri/                   # Tauri backend
├── tailwind.config.js           # Brutalist theme config
└── tauri.conf.json              # Tauri configuration
```

## 🛠️ Tech Stack

- **Tauri v2**: Desktop application framework
- **React**: UI library
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling (custom brutalist theme)
- **IBM Plex Mono**: Monospaced font

## 🎯 Keyboard Shortcuts

- **ESC**: Exit fullscreen (in game mode)

## 📝 Notes

- The application window is **non-resizable** (1024×768) by design
- The **scanline overlay** is a cosmetic effect that can be toggled by removing the `scanlines` class from App.tsx
- Audio playback uses native browser APIs for maximum compatibility
- The dialog plugin enables local file access for audio loading

## 🔧 Troubleshooting

### Application won't start

- Ensure all dependencies are installed: `npm install`
- Make sure Rust is installed: `rustc --version`

### Audio files won't load

- Check that the dialog plugin is properly configured
- Verify file permissions on your system

### Game doesn't appear

- Ensure Godot HTML5 export is in `/public/game/index.html`
- Check browser console for errors

## 📜 License

This project is a demonstration of Tauri + React integration with a nostalgic design aesthetic.

---

**Built with nostalgia for the Enhanced CD era.** 🎧✨
