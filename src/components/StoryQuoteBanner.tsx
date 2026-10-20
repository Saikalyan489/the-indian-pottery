import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface StoryQuoteBannerProps {
  quote?: string;
  attribution?: string;
}

export const StoryQuoteBanner: React.FC<StoryQuoteBannerProps> = ({
  quote,
  attribution,
}) => {
  const { ui } = useLanguage();
  const shouldReduceMotion = usePrefersReducedMotion();

  const finalQuote = quote || ui.quoteBanner?.quote || 'Crafted for our children and future generations — so that the ten-thousand-year story of Indian clay continues to inspire.';
  const finalAttribution = attribution || ui.quoteBanner?.attribution || 'Cultural Heritage Dedication';
  const badgeLabel = ui.quoteBanner?.badge || 'Passed Down to Our Children';

  return (
    <aside
      className="relative overflow-hidden border-y border-[#B8582B]/20 bg-gradient-to-r from-[#B8582B] via-[#9E3E18] to-[#843313] text-white py-12 sm:py-16 shadow-inner"
      aria-label="Cultural dedication to the next generation"
    >
      {/* Subtle earthen ornamental background radiance */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-amber-400/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          {/* Dedication Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-amber-200 mb-4 backdrop-blur-xs">
            <Heart className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>{badgeLabel}</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          </div>

          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FAF5F0] leading-snug sm:leading-relaxed tracking-tight">
            "{finalQuote}"
          </blockquote>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-white/30" />
            <p className="font-mono text-xs uppercase tracking-widest text-amber-200/90 font-medium">
              {finalAttribution}
            </p>
            <span className="h-px w-10 sm:w-16 bg-white/30" />
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

