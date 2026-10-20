import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../types';

export const LanguageSelector: React.FC = () => {
  const {
    language,
    setLanguage,
    ui,
    languages,
    showFloatingPrompt,
    dismissFloatingPrompt,
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLangInfo = languages.find((l) => l.code === language) || languages[0];

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Language Trigger Button */}
      <button
        onClick={() => {
          dismissFloatingPrompt();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-1 sm:gap-2 rounded-xl border px-2 py-1 sm:px-3 sm:py-2 text-xs font-mono font-bold transition-all active:scale-95 shadow-md shrink-0 ${
          isOpen
            ? 'border-[#E5A344] bg-[#B8582B]/30 text-amber-200 ring-2 ring-[#E5A344]/30'
            : 'border-[#E5A344]/40 bg-gradient-to-r from-black/70 to-[#1e1511]/90 text-[#FAF5F0] hover:border-[#E5A344] hover:bg-black/90'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Change Website Language / భాషను ఎంచుకోండి"
        title="Change Language / భాషను మార్చుకోండి"
      >
        <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E5A344] animate-pulse shrink-0" />
        <span className="text-[11px] sm:text-xs font-bold text-amber-300">
          {currentLangInfo.nativeLabel}
        </span>
      </button>

      {/* Floating Prompt Tooltip on Website Load (shows for 6.5s, then fades out smoothly) */}
      <AnimatePresence>
        {showFloatingPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.92 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2.5 z-50 w-72 sm:w-80 rounded-2xl border-2 border-[#E5A344] bg-gradient-to-b from-[#1E1612] via-[#2A1D16] to-[#140F0C] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-[#FAF5F0]"
            role="status"
            aria-live="polite"
          >
            {/* Triangular Upward Pointer Arrow aligned to trigger */}
            <div className="absolute -top-2 right-4 h-3.5 w-3.5 rotate-45 border-l-2 border-t-2 border-[#E5A344] bg-[#1E1612]" />

            <div className="relative z-10 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E5A344]" />
                </span>
                <span className="font-display text-xs font-bold text-amber-200 tracking-wide flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  {ui.languagePrompt.main}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissFloatingPrompt();
                }}
                className="rounded-full p-0.5 text-white/50 hover:text-white transition-colors"
                aria-label="Dismiss language reminder"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-1 text-[11px] font-sans text-[#D8C7B8] leading-tight">
              {ui.languagePrompt.sub}
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  dismissFloatingPrompt();
                  setIsOpen(true);
                }}
                className="text-[10px] font-mono font-bold text-amber-300 underline underline-offset-2 hover:text-white"
              >
                Select Language Now →
              </button>
              <span className="text-[9px] font-mono text-white/40">Auto-hiding</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Selection Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl border border-[#E5A344]/50 bg-[#16100C]/98 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-[#FAF5F0]"
            role="listbox"
            aria-label="Available languages"
          >
            <div className="px-2.5 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5A344]">
                Choose Language / భాష
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white"
                aria-label="Close language menu"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {languages.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(item.code)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#B8582B]/40 to-[#E5A344]/20 border border-[#E5A344] text-white font-bold shadow-inner'
                        : 'border border-transparent hover:bg-white/10 text-[#D8C7B8] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-sans text-[#FAF5F0]">
                          {item.nativeLabel}
                        </span>
                        <span className="text-[10px] font-mono text-[#D8C7B8]/70">
                          {item.label}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-[#E5A344]/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-300">
                        <Check className="h-3 w-3 text-amber-300" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
