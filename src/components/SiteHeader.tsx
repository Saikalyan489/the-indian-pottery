import React, { useState, useEffect, useRef } from 'react';
import { Menu, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PotteryLogo } from './PotteryLogo';
import { MobileNavigation } from './MobileNavigation';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface SiteHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isChaptersOpen?: boolean;
  onOpenChapters?: () => void;
  onCloseChapters?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeSection,
  onNavigate,
  isChaptersOpen,
  onOpenChapters,
  onCloseChapters,
}) => {
  const { content, ui, showFloatingPrompt } = useLanguage();
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = isChaptersOpen !== undefined ? isChaptersOpen : internalMenuOpen;
  const openMenu = onOpenChapters || (() => setInternalMenuOpen(true));
  const closeMenu = onCloseChapters || (() => setInternalMenuOpen(false));

  // Mobile-only sequential floating prompt for Developer: appears for 2.8s immediately after Language prompt closes
  const [showDevPrompt, setShowDevPrompt] = useState(false);
  const prevShowFloatingPrompt = useRef(showFloatingPrompt);
  const hasTriggeredDevPrompt = useRef(false);

  useEffect(() => {
    // When language floating prompt disappears (either auto or dismissed), trigger developer prompt once on mobile
    if (prevShowFloatingPrompt.current && !showFloatingPrompt && !hasTriggeredDevPrompt.current) {
      hasTriggeredDevPrompt.current = true;
      const showTimer = setTimeout(() => {
        setShowDevPrompt(true);
        const hideTimer = setTimeout(() => {
          setShowDevPrompt(false);
        }, 2800);
        return () => clearTimeout(hideTimer);
      }, 350);

      return () => clearTimeout(showTimer);
    }
    prevShowFloatingPrompt.current = showFloatingPrompt;
  }, [showFloatingPrompt]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  const handleDeveloperClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowDevPrompt(false);
    const el = document.getElementById('developer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0a09]/95 backdrop-blur-xl transition-all duration-300 shadow-2xl"
        role="banner"
      >
        <div className="mx-auto flex h-14 sm:h-18 max-w-7xl items-center justify-between px-2.5 sm:px-6 lg:px-8">
          {/* Logo & Website Title (Clean responsive sizing so full title fits without clipping or ellipsis on mobile) */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group flex items-center gap-1.5 sm:gap-2.5 py-1 focus-visible:outline-2 focus-visible:outline-[#E5A344] min-w-0"
            aria-label={`${content.brandName} - Return to top`}
          >
            <div className="shrink-0">
              <PotteryLogo size={28} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs min-[360px]:text-[13px] min-[400px]:text-sm sm:text-lg md:text-xl font-bold tracking-tight text-[#FAF5F0] transition-colors group-hover:text-[#E5A344] whitespace-nowrap">
                {content.brandName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean & Curated) */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            aria-label="Website chapters navigation"
          >
            {content.navItems.slice(1, 7).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative px-3 py-2 text-xs xl:text-[13px] font-sans font-medium tracking-wide transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-amber-300 font-bold bg-[#B8582B]/25 shadow-inner'
                      : 'text-[#D8C7B8] hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span>{item.shortLabel || item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-[#B8582B] to-[#E5A344] rounded-full shadow-[0_0_8px_#E5A344]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Developer Symbol, Language Selector & Chapters Drawer */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Developer Symbol Button & Mobile Sequential Floating Prompt */}
            <div className="relative inline-block">
              <a
                href="#developer"
                onClick={handleDeveloperClick}
                className="flex h-7 w-7 sm:h-9 sm:w-auto sm:px-2.5 items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-black/70 to-amber-950/40 text-amber-300 hover:border-amber-400 hover:text-white transition-all active:scale-95 shadow-md group shrink-0"
                title={`${ui.developer.designedBy} ${ui.developer.name}`}
                aria-label={`${ui.developer.label}: ${ui.developer.name}`}
              >
                <Code2 className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-200 transition-colors shrink-0" />
                <span className="hidden sm:inline text-[11px] font-mono font-semibold tracking-wide">
                  {ui.developer.label}
                </span>
              </a>

              {/* Mobile Floating Window: "Know about developer" (Appears for ~2.8s only once after language prompt dismisses) */}
              <AnimatePresence>
                {showDevPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="sm:hidden absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 rounded-xl border border-amber-400/80 bg-gradient-to-b from-[#241A14] to-[#140F0C] px-2.5 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.9)] backdrop-blur-xl whitespace-nowrap pointer-events-none"
                    role="tooltip"
                  >
                    {/* Upward pointer arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-l border-t border-amber-400/80 bg-[#241A14]" />
                    <div className="relative z-10 flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E5A344]" />
                      </span>
                      <span className="font-mono text-[10px] font-bold text-amber-200 tracking-tight">
                        {ui.developer.knowAbout}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector with floating hint */}
            <LanguageSelector />

            {/* Chapters Drawer Button */}
            <button
              onClick={openMenu}
              className="flex items-center gap-1 sm:gap-2 rounded-xl border border-[#E5A344]/35 bg-gradient-to-r from-black/60 to-[#1e1511]/80 px-2 py-1 sm:px-3 sm:py-2 text-xs font-mono font-semibold text-[#FAF5F0] transition-all hover:bg-black/80 hover:border-[#E5A344] focus-visible:outline-2 focus-visible:outline-[#E5A344] active:scale-95 shadow-md shrink-0"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open all chapters list"
            >
              <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E5A344]" />
              <span className="hidden min-[380px]:inline sm:hidden text-[10px] font-bold text-amber-300">{ui.header.chapters}</span>
              <span className="hidden sm:inline font-sans text-xs">{ui.header.allChapters}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chapters Drawer Navigation */}
      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={closeMenu}
        items={content.navItems}
        activeId={activeSection}
        onNavigate={onNavigate}
      />
    </>
  );
};

