import React, { useState, useRef, useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fixed track list for CD
  const tracks = [
    { name: "TRACK 01 :: DIGITAL BATH", path: "/audio/track01.mp3" },
    { name: "TRACK 02 :: ELITE", path: "/audio/track02.mp3" },
    { name: "TRACK 03 :: RX QUEEN", path: "/audio/track03.mp3" },
    { name: "TRACK 04 :: STREET CARP", path: "/audio/track04.mp3" },
    { name: "TRACK 05 :: TEENAGER", path: "/audio/track05.mp3" },
  ];

  const currentTrack = tracks[currentTrackIndex] || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Auto-advance to next track
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentTrackIndex(0);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Load track when index changes
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.path;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const vuMeterBars = 12;
  const activeVuBars = isPlaying
    ? Math.floor(volume * vuMeterBars * (0.7 + Math.random() * 0.3))
    : 0;

  return (
    <div className="bg-concrete border-t-5 border-steel p-4">
      <audio ref={audioRef} />

      <div className="flex items-center gap-4">
        {/* VU Meter */}
        <div className="flex gap-0.5 items-end h-12">
          {Array.from({ length: vuMeterBars }).map((_, i) => (
            <div
              key={i}
              className={`w-2 transition-all duration-100 ${
                i < activeVuBars
                  ? i < vuMeterBars * 0.7
                    ? "bg-electric"
                    : "bg-electric opacity-60"
                  : "bg-steel"
              }`}
              style={{ height: `${((i + 1) / vuMeterBars) * 100}%` }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex-1 flex items-center gap-3">
          {/* Transport Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousTrack}
              disabled={currentTrackIndex === 0}
              className={`w-10 h-10 border-2 text-lg flex items-center justify-center transition-all ${
                currentTrackIndex === 0
                  ? "bg-steel text-smoke border-fog cursor-not-allowed"
                  : "bg-steel text-chrome border-fog hover:border-electric hover:text-electric"
              }`}
              title="Previous Track"
            >
              ⏮
            </button>

            <button
              onClick={togglePlayPause}
              disabled={!currentTrack}
              className={`w-12 h-12 border-3 text-2xl flex items-center justify-center transition-all ${
                currentTrack
                  ? "bg-electric text-void border-electric hover:bg-electric-dark"
                  : "bg-steel text-smoke border-fog cursor-not-allowed"
              }`}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={nextTrack}
              disabled={currentTrackIndex === tracks.length - 1}
              className={`w-10 h-10 border-2 text-lg flex items-center justify-center transition-all ${
                currentTrackIndex === tracks.length - 1
                  ? "bg-steel text-smoke border-fog cursor-not-allowed"
                  : "bg-steel text-chrome border-fog hover:border-electric hover:text-electric"
              }`}
              title="Next Track"
            >
              ⏭
            </button>
          </div>

          {/* Track Info & Progress */}
          <div className="flex-1">
            <div className="text-electric text-sm font-mono mb-1 truncate">
              {currentTrack ? currentTrack.name : "NO DISC LOADED"}
            </div>

            {/* Progress Bar */}
            <div className="relative h-6 bg-steel border-2 border-fog">
              <div
                className="h-full bg-electric transition-all"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <span className="text-void text-xs font-bold mix-blend-difference">
                  {formatTime(currentTime)}
                </span>
                <span className="text-void text-xs font-bold mix-blend-difference">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <span className="text-fog text-xs">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-2 bg-steel appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #00d4ff ${volume * 100}%, #2a2a2a ${volume * 100}%)`,
              }}
            />
            <span className="text-electric text-xs font-mono w-8">
              {Math.round(volume * 100)}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`status-indicator ${isPlaying ? "status-active" : "status-inactive"}`}
            ></div>
            <span className="text-smoke text-xs font-mono">
              {isPlaying ? "PLAYING" : "STOPPED"}
            </span>
          </div>
        </div>
      </div>

      {/* Rack Details */}
      <div className="mt-2 flex justify-between items-center text-xs text-fog font-mono">
        <div>AUDIO SUBSYSTEM :: CD QUALITY</div>
        <div className="flex gap-4">
          <span>
            TRACK: {currentTrackIndex + 1}/{tracks.length}
          </span>
          <span>CD-DA FORMAT</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
