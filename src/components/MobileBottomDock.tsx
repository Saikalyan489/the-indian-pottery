import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChapters: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  activeSection,
  onNavigate,
  onOpenChapters,
}) => {
  const { content, ui } = useLanguage();

  // Dynamically mapped from active localized content
  const storyStops = [
    { id: 'home', label: content.navItems[0]?.label || 'Home', num: '01' },
    { id: 'studio', label: ui.dock.chapters, num: '3D' },
    ...content.navItems.slice(1).map((item) => ({
      id: item.id,
      label: item.shortLabel || item.label,
      num: item.number,
    })),
    { id: 'potter-game', label: ui.game.badge, num: '3D' },
  ];

  const currentIndex = storyStops.findIndex((s) => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentStop = storyStops[safeIndex];

  const prevStop = safeIndex > 0 ? storyStops[safeIndex - 1] : null;
  const nextStop = safeIndex < storyStops.length - 1 ? storyStops[safeIndex + 1] : null;
  const progressPercent = Math.round(((safeIndex + 1) / storyStops.length) * 100);

  return (
    <aside
      className="lg:hidden fixed bottom-3 inset-x-3 z-40 mx-auto max-w-md select-none"
      aria-label="Mobile story navigation bar"
    >
      <div className="flex items-center justify-between gap-1.5 rounded-2xl border border-[#E5A344]/40 bg-[#16100c]/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.85)] backdrop-blur-xl text-[#FAF5F0]">
        {/* Previous Chapter Button */}
        <button
          onClick={() => prevStop && onNavigate(prevStop.id)}
          disabled={!prevStop}
          className={`flex h-10 items-center gap-1 rounded-xl px-2.5 text-xs font-mono font-bold transition-all ${
            prevStop
              ? 'bg-white/10 text-amber-200 active:scale-95 hover:bg-white/15'
              : 'opacity-30 cursor-not-allowed text-white/40'
          }`}
          title={prevStop ? `Go to ${prevStop.label}` : 'At Beginning'}
          aria-label="Previous chapter"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{ui.dock.prev}</span>
        </button>

        {/* Center Pill: Current Chapter Info & Quick Chapter Drawer Trigger */}
        <button
          onClick={onOpenChapters}
          className="flex-1 flex flex-col items-center justify-center rounded-xl bg-black/50 border border-white/10 px-2.5 py-1 transition-all active:scale-98 hover:border-[#E5A344]/60"
          title="Tap to see all story chapters"
          aria-label="Open chapters menu"
        >
          <div className="flex items-center gap-1.5 w-full justify-center">
            <span className="font-mono text-[10px] text-[#E5A344] font-bold">
              {currentStop.num}
            </span>
            <span className="truncate font-sans text-xs font-bold text-[#FAF5F0] max-w-[170px]">
              {currentStop.label}
            </span>
            <BookOpen className="h-3 w-3 text-[#E5A344] shrink-0" />
          </div>

          {/* Mini progress line */}
          <div className="mt-1 h-1 w-full max-w-[140px] rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B8582B] via-[#E5A344] to-amber-300 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </button>

        {/* Next Chapter Button */}
        <button
          onClick={() => nextStop && onNavigate(nextStop.id)}
          disabled={!nextStop}
          className={`flex h-10 items-center gap-1 rounded-xl px-2.5 text-xs font-mono font-bold transition-all ${
            nextStop
              ? 'bg-gradient-to-r from-[#B8582B] to-[#D86D3D] text-white active:scale-95 hover:brightness-110 shadow-md'
              : 'opacity-30 cursor-not-allowed text-white/40'
          }`}
          title={nextStop ? `Go to ${nextStop.label}` : 'At Final Chapter'}
          aria-label="Next chapter"
        >
          <span className="hidden sm:inline">{ui.dock.next}</span>
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Quick Top button when scrolled down */}
        {safeIndex > 1 && (
          <button
            onClick={() => onNavigate('home')}
            className="flex h-10 w-9 items-center justify-center rounded-xl bg-white/10 text-amber-200 transition-all active:scale-95 hover:bg-white/15 border border-white/10"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
