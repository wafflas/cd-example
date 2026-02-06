# How to Build and Burn the Enhanced CD

This guide will help you create a physical Enhanced CD (Bluebook format) with audio tracks in Session 1 and the data application in Session 2.

## 📦 Step 1: Build the Application

### Build the Portable Executable

```powershell
# In the project directory
npm run tauri build
```

**Build output location:**

```
src-tauri/target/release/bundle/nsis/enhanced-cd-app_0.1.0_x64-setup.exe
```

Or if you want just the executable without installer:

```
src-tauri/target/release/enhanced-cd-app.exe
```

---

## 📁 Step 2: Prepare the CD Directory Structure

Create a folder that will be the root of your CD:

```
CD_ROOT/
├── enhanced-cd-app.exe           # The main application
├── game/                         # Godot game files
│   ├── index.html
│   ├── game.wasm                 # 37MB file
│   ├── game.pck
│   ├── game.js
│   └── *.png, *.js, etc.
├── audio/                       # Optional: MP3 audio tracks
│   ├── track01.mp3
│   ├── track02.mp3
│   ├── track03.mp3
│   ├── track04.mp3
│   └── track05.mp3
└── autorun.inf                  # Windows autoplay file
```

### Copy Files to CD_ROOT

```powershell
# Create the CD root directory
New-Item -ItemType Directory -Path "C:\CD_BUILD" -Force

# Copy the executable
Copy-Item "src-tauri\target\release\enhanced-cd-app.exe" "C:\CD_BUILD\"

# Copy the game folder
Copy-Item -Recurse "public\game" "C:\CD_BUILD\"

# Copy autorun.inf
Copy-Item "public\autorun.inf" "C:\CD_BUILD\"

# Create audio folder (optional - for MP3 tracks)
New-Item -ItemType Directory -Path "C:\CD_BUILD\audio" -Force
```

---

## 💿 Step 3: Burn the Enhanced CD

### Option A: Single Data Session (Simplest)

If you're not including CD-Audio tracks, burn as a standard data disc:

**Using ImgBurn (Windows):**

1. Download ImgBurn: https://www.imgburn.com/
2. Open ImgBurn → "Write files/folders to disc"
3. Add the `C:\CD_BUILD` folder
4. **Important Settings:**
   - File System: **ISO9660 + UDF**
   - Volume Label: **ENHANCED_CD**
5. Click "Write" (burn icon)
6. Test the disc on multiple systems

**Using PowerShell (Windows 10/11):**

```powershell
# Create ISO first
$isoPath = "C:\enhanced-cd.iso"
$cdPath = "C:\CD_BUILD"

# You'll need a third-party tool like oscdimg or mkisofs for this
# Windows doesn't have built-in ISO creation from PowerShell
```

### Option B: Enhanced CD (Audio + Data Sessions)

For a true "Enhanced CD" with audio in Session 1 and data in Session 2:

**Requirements:**

- Audio files in **WAV format** (CD-Audio standard)
- Data files organized in `CD_ROOT`
- CD burning software that supports multi-session: **Nero**, **CDBurnerXP**, or **K3b** (Linux)

**Steps with CDBurnerXP (Free):**

1. **Session 1 - Audio Tracks:**
   - Open CDBurnerXP
   - Choose "Audio Disc"
   - Add your WAV audio files
   - **Important:** Do NOT finalize the disc
   - Burn Session 1

2. **Session 2 - Data:**
   - Insert the same disc (don't eject after Session 1)
   - Choose "Data Disc"
   - Add all files from `C:\CD_BUILD`
   - **Important:** Finalize the disc this time
   - Burn Session 2

The result is a "Mixed Mode CD" or "Enhanced CD" that plays in CD players (Session 1) and loads the app on computers (Session 2).

---

## 🧪 Step 4: Testing

### Test on the Development Machine

```powershell
# Run directly from the CD_BUILD folder
cd C:\CD_BUILD
.\enhanced-cd-app.exe
```

### Test on Different Systems

1. **Burn a test disc**
2. **Insert into different Windows PCs**
3. **Verify:**
   - Autorun launches the app (if autorun is enabled)
   - Window opens at 1024×768
   - Game loads after disc reading animation
   - Audio player shows the track list

### Test Different Drive Letters

Windows assigns different letters (D:, E:, F:) to CD drives. Since we use relative paths, it should work on all drives.

---

## ⚙️ Troubleshooting

### Autorun Doesn't Work

Windows 10/11 disable autorun for security. Users need to:

1. Open File Explorer
2. Right-click the CD drive
3. Click "Open" or "Autoplay"

Or run the executable manually.

### Game Doesn't Load

1. Check that `game/index.html` exists
2. Verify the WASM file (`game.wasm`) is ~37MB
3. Check browser console in the GameBridge iframe

### Audio Files Not Playing

The AudioPlayer expects files in `/audio/` folder:

- `track01.mp3`
- `track02.mp3`
- etc.

If files are missing, the player won't find them.

---

## 🎨 Customization

### Change Track Names

Edit `src/components/AudioPlayer.tsx`:

```typescript
const tracks = [
  { name: "TRACK 01 :: YOUR SONG NAME", path: "/audio/track01.mp3" },
  { name: "TRACK 02 :: ANOTHER SONG", path: "/audio/track02.mp3" },
  // ... add more tracks
];
```

### Change Window Title

Edit `src-tauri/tauri.conf.json`:

```json
"title": "Your Custom Title Here"
```

---

## 📝 Final Checklist

Before burning your master disc:

- [ ] Application builds without errors
- [ ] Game loads and plays correctly
- [ ] Audio tracks are in `/audio/` folder
- [ ] `autorun.inf` is in the CD root
- [ ] Tested on at least 2 different computers
- [ ] Window is locked at 1024×768
- [ ] All assets use relative paths
- [ ] No file write operations (read-only safe)

---

## 🎯 Distribution

Once you have a working master disc:

1. **Duplicate:** Use disc duplication services for quantity
2. **Label:** Print CD labels with Deftones/White Pony-inspired art
3. **Case:** Use jewel cases with custom inserts
4. **Distribute:** Share your Enhanced CD with friends!

**Enjoy your nostalgic multimedia experience! 🎧✨**
