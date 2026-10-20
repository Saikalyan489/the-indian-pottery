import React, { useEffect, useRef } from 'react';
import { X, ChevronRight } from 'lucide-react';
import type { NavItem } from '../types';
import { PotteryLogo } from './PotteryLogo';
import { useLanguage } from '../context/LanguageContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  items,
  activeId,
  onNavigate,
}) => {
  const { content, ui } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key and manage body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside className="relative z-10 flex h-full w-full max-w-sm flex-col bg-[#140f0c] border-l border-[#B8582B]/35 shadow-2xl transition-transform animate-in slide-in-from-right duration-250 text-[#FAF5F0]">
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4.5 bg-[#1a1410]/90">
          <div className="flex items-center gap-3">
            <PotteryLogo size={34} />
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-[#FAF5F0]">
                {content.brandName}
              </span>
              <p className="text-[11px] font-mono tracking-wider text-[#E5A344]">
                {ui.header.allChapters}
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="rounded-full p-2 text-[#D8C7B8] hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E5A344]"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile chapter links">
          <p className="px-3 pb-2.5 text-xs font-mono tracking-widest text-[#E5A344] uppercase">
            {content.sectionsNavLabel}
          </p>
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#B8582B]/25 text-amber-300 font-semibold border-l-4 border-[#E5A344]'
                        : 'text-[#D8C7B8] hover:bg-white/5 hover:text-white'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? 'text-[#E5A344] font-bold' : 'text-white/40'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="font-sans text-base font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        isActive
                          ? 'text-[#E5A344] translate-x-0.5'
                          : 'text-white/30 group-hover:translate-x-1 group-hover:text-[#E5A344]'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="border-t border-white/10 p-4.5 bg-[#1a1410]/90">
          <p className="text-xs text-[#D8C7B8] leading-relaxed font-sans font-medium">
            "{content.tagline}"
          </p>
        </div>
      </aside>
    </div>
  );
};
