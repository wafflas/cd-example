# Godot PWA Cleanup Checklist for CD-ROM

This checklist ensures your Godot HTML5 export works **100% offline** without any PWA/online dependencies.

## ✅ Files to DELETE from `/public/game/`

These files are for Progressive Web App (PWA) functionality and require internet:

- [x] **`game.service.worker.js`** - Service worker (requires online registration)
- [x] **`game.manifest.json`** - PWA manifest (calls home for updates)
- [x] **`game.offline.html`** - PWA offline fallback page

## ✅ Files to KEEP (Essential for Offline Execution)

**Core Game Files:**

- ✅ `index.html` - Main entry point (modified: service worker disabled)
- ✅ `game.js` - Godot engine JavaScript loader
- ✅ `game.wasm` - WebAssembly binary (37.7 MB)
- ✅ `game.pck` - Packed game assets (115 KB)

**Audio Worklets:**

- ✅ `game.audio.worklet.js` - Audio processing
- ✅ `game.audio.position.worklet.js` - Audio position tracking

**Icons & Assets:**

- ✅ `game.icon.png`
- ✅ `game.png` - Splash screen
- ✅ `game.144x144.png`
- ✅ `game.180x180.png`
- ✅ `game.512x512.png`
- ✅ `game.apple-touch-icon.png`
- ✅ `icon.svg`

## ✅ Modifications Made to `index.html`

```javascript
// BEFORE (PWA mode - requires internet):
const GODOT_CONFIG = {
  serviceWorker: "game.service.worker.js",
  ensureCrossOriginIsolationHeaders: true,
};

// AFTER (Offline mode - works on CD):
const GODOT_CONFIG = {
  serviceWorker: "", // ← Disabled
  ensureCrossOriginIsolationHeaders: false, // ← Disabled
};
```

**Also removed:**

```html
<!-- REMOVED from <head>: -->
<link rel="manifest" href="game.manifest.json" />
```

## ✅ Tauri Security Headers Added

In `src-tauri/tauri.conf.json`:

```json
"headers": {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp"
}
```

These headers allow WASM execution without a service worker.

## ✅ GameBridge Configuration

- iframe src: `game/index.html` (relative path)
- No absolute paths (works from any drive letter)
- Sandbox attributes for security

## 🧪 Testing Checklist

Before burning to CD:

- [ ] Close and reopen the app
- [ ] Navigate to "THE GAME" section
- [ ] Verify NO "You are offline" error
- [ ] Game loads and runs smoothly
- [ ] WASM file loads (check disc reading animation)
- [ ] No console errors about service workers
- [ ] Works without internet connection (disable WiFi to test)

## 📝 Godot Export Settings (For Future Reference)

When exporting from Godot:

1. **Export Template:** HTML5
2. **Export Mode:** Release
3. **Custom HTML Shell:** None (use default)
4. **Progressive Web App:** **DISABLED** ❌
5. **Head Include:** None
6. **Offline:** **DISABLED** ❌

## 🔥 Why This Works

**Problem:** Godot's PWA export tries to register a service worker on first load, which requires an internet connection to fetch and install the worker script.

**Solution:** By disabling the service worker and setting `ensureCrossOriginIsolationHeaders: false`, we tell Godot to run in "basic" mode. Tauri's custom headers (`COOP`/`COEP`) provide the WASM isolation needed for execution.

**Result:** The game runs 100% offline from the CD-ROM without ever calling home!

---

## ⚠️ Important Notes

- **Don't Re-Export:** Once you've cleaned the export, don't re-export from Godot or you'll get the PWA files back
- **Keep Backups:** Save a clean copy of the `/public/game/` folder
- **Test Thoroughly:** Always test offline before burning physical media

✅ **Your Godot export is now CD-ROM ready!**
