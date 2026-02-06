import React, { useState } from "react";

type NavigationItem = "audio" | "video" | "archives" | "game";

interface NavigationProps {
  activeSection: NavigationItem;
  onNavigate: (section: NavigationItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [hoverItem, setHoverItem] = useState<NavigationItem | null>(null);

  const navItems: { id: NavigationItem; label: string; symbol: string }[] = [
    { id: "audio", label: "Audio Player", symbol: "▶" },
    { id: "video", label: "Video Gallery", symbol: "◉" },
    { id: "archives", label: "Archives", symbol: "▣" },
    { id: "game", label: "The Game", symbol: "◈" },
  ];

  return (
    <nav className="w-64 bg-concrete border-r-5 border-steel h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-electric font-bold text-xl tracking-wider mb-1 crt-glow">
          ENHANCED CD
        </h1>
        <div className="text-fog text-xs tracking-widest">
          WHITE PONY EDITION
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="status-indicator status-active"></div>
          <span className="text-xs text-smoke">SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoverItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoverItem(item.id)}
              onMouseLeave={() => setHoverItem(null)}
              className={`
                relative w-full text-left p-4 border-3 transition-all duration-100
                font-mono text-sm tracking-wider uppercase
                ${
                  isActive
                    ? "bg-electric text-void border-electric shadow-brutal"
                    : "bg-steel border-fog text-chrome hover:border-electric hover:text-electric"
                }
                ${isHovered && !isActive ? "translate-x-1" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{item.symbol}</span>
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className="status-indicator status-active"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t-3 border-steel">
        <div className="text-fog text-xs font-mono">
          <div className="flex justify-between mb-1">
            <span>SYSTEM</span>
            <span className="text-electric">v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>RES</span>
            <span className="text-chrome">1024×768</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
