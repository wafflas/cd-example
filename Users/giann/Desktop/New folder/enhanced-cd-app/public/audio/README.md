# Audio Tracks Directory

This directory should contain your audio tracks in MP3 format for the Enhanced CD audio player.

## Expected Files

Place your audio files here with these exact names:

- `track01.mp3`
- `track02.mp3`
- `track03.mp3`
- `track04.mp3`
- `track05.mp3`

## Track Names

The current track names in the AudioPlayer component are themed after the White Pony album. You can customize these in `src/components/AudioPlayer.tsx`.

## For CD-Audio Support

If you want to create a true Enhanced CD with CD-Audio (Red Book) format in Session 1:

- Convert your tracks to **WAV format** (44.1kHz, 16-bit, stereo)
- Burn Session 1 as Audio CD
- Burn Session 2 as Data CD with the application

See `CD-BUILD.md` for complete instructions.
