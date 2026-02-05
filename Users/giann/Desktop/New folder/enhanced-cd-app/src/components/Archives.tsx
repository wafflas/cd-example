import React from "react";

const Archives: React.FC = () => {
  const archiveItems = [
    { name: "LINER_NOTES.txt", size: "4KB", date: "2000.06.20" },
    { name: "CREDITS.txt", size: "2KB", date: "2000.06.20" },
    { name: "LYRICS/", size: "12KB", date: "2000.06.20" },
    { name: "PHOTOS/", size: "2.4MB", date: "2000.06.20" },
    { name: "WALLPAPERS/", size: "1.8MB", date: "2000.06.20" },
    { name: "README.txt", size: "1KB", date: "2000.06.20" },
  ];

  return (
    <div className="w-full h-full bg-void p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-electric text-2xl font-bold">▣</div>
          <h2 className="text-electric font-bold text-2xl tracking-wider">
            ARCHIVES
          </h2>
        </div>
        <p className="text-fog text-sm">FILE SYSTEM :: DISC CONTENTS</p>
      </div>

      {/* File Browser */}
      <div className="bg-concrete border-3 border-steel">
        {/* Header */}
        <div className="bg-steel border-b-3 border-fog p-3 grid grid-cols-4 gap-4 text-electric text-xs font-bold">
          <div>NAME</div>
          <div>SIZE</div>
          <div>DATE</div>
          <div>STATUS</div>
        </div>

        {/* File List */}
        <div>
          {archiveItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 grid grid-cols-4 gap-4 border-b-2 border-steel hover:bg-steel transition-all cursor-pointer group text-sm font-mono"
            >
              <div className="text-chrome group-hover:text-electric transition-all">
                {item.name}
              </div>
              <div className="text-fog">{item.size}</div>
              <div className="text-fog">{item.date}</div>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-active"></div>
                <span className="text-smoke text-xs">READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-concrete border-3 border-steel space-y-2">
        <div className="text-electric font-bold text-sm mb-2">
          INSTRUCTIONS:
        </div>
        <div className="text-smoke text-xs font-mono">
          • SELECT FILE TO VIEW CONTENTS
        </div>
        <div className="text-smoke text-xs font-mono">
          • FOLDERS CONTAIN ADDITIONAL MEDIA
        </div>
        <div className="text-smoke text-xs font-mono">
          • READ README.TXT FOR DISC INFORMATION
        </div>
      </div>
    </div>
  );
};

export default Archives;
