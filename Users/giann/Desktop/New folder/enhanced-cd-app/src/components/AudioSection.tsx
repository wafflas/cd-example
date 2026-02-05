import React from "react";

const AudioSection: React.FC = () => {
  return (
    <div className="w-full h-full bg-void p-8 overflow-auto flex items-center justify-center">
      <div className="max-w-2xl text-center space-y-8">
        {/* Large Icon */}
        <div className="text-electric text-8xl crt-glow">▶</div>

        {/* Title */}
        <div>
          <h2 className="text-electric font-bold text-4xl tracking-wider mb-2">
            AUDIO PLAYER
          </h2>
          <p className="text-fog text-lg">DIGITAL CD TRANSPORT SYSTEM</p>
        </div>

        {/* Info Panels */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-concrete border-3 border-steel p-6">
            <div className="text-electric font-bold mb-2">SPECIFICATIONS</div>
            <div className="text-smoke text-xs font-mono space-y-1">
              <div>• 16-BIT STEREO</div>
              <div>• 44.1KHZ SAMPLING</div>
              <div>• CD QUALITY AUDIO</div>
              <div>• MULTI-FORMAT SUPPORT</div>
            </div>
          </div>

          <div className="bg-concrete border-3 border-steel p-6">
            <div className="text-electric font-bold mb-2">
              SUPPORTED FORMATS
            </div>
            <div className="text-smoke text-xs font-mono space-y-1">
              <div>• MP3</div>
              <div>• WAV</div>
              <div>• OGG</div>
              <div>• FLAC</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-concrete border-3 border-steel p-6 text-left">
          <div className="text-electric font-bold mb-3 text-center">
            QUICK START
          </div>
          <div className="text-smoke text-sm font-mono space-y-2">
            <div>1. CLICK "⊕ LOAD" IN THE PLAYER BELOW</div>
            <div>2. SELECT AN AUDIO FILE FROM YOUR SYSTEM</div>
            <div>3. PRESS "▶" TO BEGIN PLAYBACK</div>
            <div>4. ADJUST VOLUME USING THE SLIDER CONTROL</div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-3 text-fog text-sm">
          <div className="status-indicator status-active"></div>
          <span>AUDIO SUBSYSTEM READY</span>
        </div>
      </div>
    </div>
  );
};

export default AudioSection;
