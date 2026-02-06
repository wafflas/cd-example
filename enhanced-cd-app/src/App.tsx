import { useState } from "react";
import Navigation from "./components/Navigation";
import AudioSection from "./components/AudioSection";
import VideoGallery from "./components/VideoGallery";
import Archives from "./components/Archives";
import GameBridge from "./components/GameBridge";
import AudioPlayer from "./components/AudioPlayer";
import "./index.css";

type NavigationItem = "audio" | "video" | "archives" | "game";

function App() {
  const [activeSection, setActiveSection] = useState<NavigationItem>("audio");

  const renderSection = () => {
    switch (activeSection) {
      case "audio":
        return <AudioSection />;
      case "video":
        return <VideoGallery />;
      case "archives":
        return <Archives />;
      case "game":
        return <GameBridge />;
      default:
        return <AudioSection />;
    }
  };

  return (
    <div className="w-screen h-screen bg-void flex flex-col overflow-hidden scanlines">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Navigation
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">{renderSection()}</div>
      </div>

      {/* Persistent Audio Player */}
      <AudioPlayer />
    </div>
  );
}

export default App;
