import React from "react";

const VideoGallery: React.FC = () => {
  const videoPlaceholders = [
    { id: 1, title: "PERFORMANCE_001.mpg" },
    { id: 2, title: "BEHIND_SCENES_02.mpg" },
    { id: 3, title: "STUDIO_SESSION.mpg" },
    { id: 4, title: "MUSIC_VIDEO_01.mpg" },
  ];

  return (
    <div className="w-full h-full bg-void p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-electric text-2xl font-bold">◉</div>
          <h2 className="text-electric font-bold text-2xl tracking-wider">
            VIDEO GALLERY
          </h2>
        </div>
        <p className="text-fog text-sm">
          MULTIMEDIA ARCHIVE :: MPEG COLLECTION
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-6">
        {videoPlaceholders.map((video) => (
          <div
            key={video.id}
            className="bg-concrete border-3 border-steel p-4 hover:border-electric transition-all cursor-pointer group"
          >
            <div className="aspect-video bg-steel border-2 border-fog mb-3 flex items-center justify-center group-hover:border-electric transition-all">
              <div className="text-6xl text-fog group-hover:text-electric transition-all">
                ▶
              </div>
            </div>
            <div className="text-chrome font-mono text-sm group-hover:text-electric transition-all">
              {video.title}
            </div>
            <div className="text-fog text-xs mt-1">320×240 :: 29.97fps</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-concrete border-3 border-steel">
        <div className="text-smoke text-xs font-mono text-center">
          VIDEO PLAYBACK REQUIRES CODEC INSTALLATION
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
