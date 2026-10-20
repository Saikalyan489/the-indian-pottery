import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';

export const CivilizationTitleBanner: React.FC = () => {
  const { ui } = useLanguage();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Dynamic scroll-driven smooth reduction: compresses gently as user scrolls down, restores when scrolled back to top
  const bannerScale = useTransform(scrollY, [0, 220], [1, 0.88]);
  const bannerOpacity = useTransform(scrollY, [0, 250], [1, 0.85]);
  const contentY = useTransform(scrollY, [0, 220], [0, -6]);
  const badgeScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  const badgeOpacity = useTransform(scrollY, [0, 150], [1, 0.55]);

  return (
    <motion.section
      aria-label="Civilization Heritage Statement"
      style={shouldReduceMotion ? {} : { scale: bannerScale, opacity: bannerOpacity }}
      className="relative w-full overflow-hidden border-b border-[#E5A344]/25 bg-[#0e0a08] py-5 sm:py-7 md:py-8 transition-[padding] duration-300 origin-center"
    >
      {/* Dedicated Traveling Background of Ancient Terracotta Relief Mural */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          className={`absolute -inset-x-20 inset-y-0 ${
            shouldReduceMotion ? '' : 'animate-travel-bg'
          }`}
        >
          <img
            src="/images/hero/civilization-relief.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-30 contrast-[1.25] brightness-[0.6] filter"
          />
        </div>

        {/* Sophisticated gradient vignettes to preserve crisp contrast & seamless isolation */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0a08] via-[#0e0a08]/75 to-[#0e0a08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09] via-transparent to-[#0e0a08]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(14,10,8,0.85)_95%)]" />

        {/* Subtle warm amber ambient flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-3/4 max-w-4xl rounded-full bg-[#E5A344]/10 blur-[90px]" />
      </div>

      {/* Main Content Container: Strict One-Line Responsive Title with Scroll Reduction */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: contentY }}
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Cultural Antiquity Badge */}
        <motion.div
          style={shouldReduceMotion ? {} : { scale: badgeScale, opacity: badgeOpacity }}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#E5A344]/35 bg-black/60 px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#E5A344] backdrop-blur-md mb-2 sm:mb-2.5 shadow-lg max-w-full"
        >
          <Sparkles className="h-3 w-3 text-amber-400 animate-spin-slow shrink-0" />
          <span className="truncate">{ui.civilizationBanner.badge}</span>
          <Sparkles className="h-3 w-3 text-amber-400 animate-spin-slow shrink-0" />
        </motion.div>

        {/* Responsive Monumental Heading (Fits comfortably on all mobile devices without horizontal clipping) */}
        <div className="w-full flex justify-center px-1 sm:px-2">
          <h2
            className="text-center font-display font-extrabold uppercase tracking-normal sm:tracking-wide select-none animate-text-shine break-words max-w-full"
            style={{
              fontSize: 'clamp(0.68rem, 3.3vw, 2.15rem)',
              lineHeight: 1.25,
            }}
          >
            {ui.civilizationBanner.title}
          </h2>
        </div>

        {/* Ornate Terracotta Underline Accents */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-2.5 flex items-center justify-center gap-2"
        >
          <div className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#E5A344]/60 to-[#E5A344]" />
          <div className="h-1.5 w-1.5 rotate-45 bg-[#E5A344] shadow-[0_0_8px_#E5A344]" />
          <div className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#E5A344]/60 to-[#E5A344]" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
