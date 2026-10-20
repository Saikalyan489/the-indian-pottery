import React, { useState } from 'react';
import { Calendar, Sparkles, MapPin, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';

const ERA_METADATA: Record<string, { imageSrc: string; color: string; imageAlt: string }> = {
  mehrgarh: {
    imageSrc: '/images/ancient/mehrgarh-pot.jpg',
    color: '#BD9F7B',
    imageAlt: 'Neolithic hand-formed earthenware pot with basket impressions from Mehrgarh',
  },
  harappan: {
    imageSrc: '/images/ancient/harappan-pot.jpg',
    color: '#B8582B',
    imageAlt: 'Harappan painted terracotta jar with black geometric and leaf motifs',
  },
  pgw: {
    imageSrc: '/images/ancient/pgw-pot.jpg',
    color: '#6C6863',
    imageAlt: 'Painted Grey Ware ceramic vessel with black geometric bands',
  },
  nbpw: {
    imageSrc: '/images/ancient/nbpw-pot.jpg',
    color: '#211D1A',
    imageAlt: 'Northern Black Polished Ware ceramic bowl with mirror-like metallic luster',
  },
  living: {
    imageSrc: '/images/pottery-making/05-finished-pot.jpg',
    color: '#FF6B35',
    imageAlt: 'Finished lustrous red terracotta pots handcrafted by living Indian artisans',
  },
};

export const AncientTimeScrubber: React.FC = () => {
  const { ui } = useLanguage();
  const [activeEraIndex, setActiveEraIndex] = useState<number>(1); // Default Indus Harappan
  const shouldReduceMotion = usePrefersReducedMotion();

  const eras = ui.scrubberExtras?.eras || [];
  const currentEra = eras[activeEraIndex] || eras[0];
  const currentMeta = currentEra ? ERA_METADATA[currentEra.id] || ERA_METADATA.harappan : ERA_METADATA.harappan;

  if (!currentEra) return null;

  return (
    <div className="mt-8 rounded-3xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310] via-[#221813] to-[#181310] p-4 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#E5A344]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5A344]">
            {ui.scrubberExtras.title}
          </span>
        </div>
        <span className="font-mono text-xs text-[#D8C7B8]">
          {ui.scrubberExtras.scrubHint}
        </span>
      </div>

      {/* Interactive Timeline Rail with Miniature Pot Avatars */}
      <div className="mt-6 flex items-center justify-between gap-2 overflow-x-auto pb-4 scrollbar-none">
        {eras.map((era, idx) => {
          const isActive = idx === activeEraIndex;
          const meta = ERA_METADATA[era.id] || ERA_METADATA.harappan;
          return (
            <button
              key={era.id}
              onClick={() => setActiveEraIndex(idx)}
              className={`group relative flex flex-col items-center min-w-[110px] sm:min-w-[145px] p-2 sm:p-2.5 rounded-2xl transition-all ${
                isActive
                  ? 'bg-black/60 shadow-lg border border-[#E5A344]/50 scale-103'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              {/* Miniature Pot Photo Circle */}
              <div
                className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-[#E5A344] shadow-[0_0_10px_rgba(229,163,68,0.5)] scale-110'
                    : 'border-white/20 opacity-70 group-hover:opacity-100'
                }`}
              >
                <img
                  src={meta.imageSrc}
                  alt={meta.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Year Label */}
              <span
                className={`mt-2 font-mono text-[10px] sm:text-[11px] font-bold ${
                  isActive ? 'text-[#E5A344]' : 'text-[#D8C7B8]/70'
                }`}
              >
                {era.year}
              </span>

              {/* Title snippet */}
              <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#FAF5F0] text-center line-clamp-1 mt-0.5">
                {era.title.split('(')[0]}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div
                  layoutId="active-era-dot"
                  className="absolute -bottom-1 h-1 w-12 bg-gradient-to-r from-[#B8582B] to-[#E5A344] rounded-full"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Era Detailed Artifact Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.id}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-7 shadow-lg backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Ancient Pot Photo Showcase (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative group w-36 h-36 sm:w-48 sm:h-48 overflow-hidden rounded-2xl border border-[#E5A344]/35 bg-radial from-[#241A14] to-[#120E0C] shadow-xl p-1.5">
                <img
                  src={currentMeta.imageSrc}
                  alt={currentMeta.imageAlt}
                  className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-2 inset-x-2 rounded-lg bg-black/85 border border-white/10 px-2 py-1 text-center font-mono text-[9px] sm:text-[10px] text-white/90 backdrop-blur-xs flex items-center justify-center gap-1">
                  <ZoomIn className="h-3 w-3 text-amber-400 shrink-0" />
                  <span className="truncate">{currentEra.specimen}</span>
                </div>
              </div>
              <span className="mt-2 font-mono text-[10px] sm:text-[11px] text-[#E5A344] font-medium text-center">
                {ui.scrubberExtras.badge}: {currentEra.title.split('(')[0]}
              </span>
            </div>

            {/* Ancient Pottery Description & Archaeological Context (8 cols) */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#E5A344] uppercase tracking-wider">
                      {currentEra.year}
                    </span>
                    <h3 className="font-display text-lg sm:text-2xl font-bold text-[#FAF5F0] mt-0.5">
                      {currentEra.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-mono text-amber-300">
                    <MapPin className="h-3.5 w-3.5 text-[#E5A344] shrink-0" />
                    <span>{ui.scrubberExtras.specimenSite}: {currentEra.archaeologicalSite}</span>
                  </div>
                </div>

                <p className="mt-2 font-sans text-xs sm:text-sm text-amber-200/90 italic font-medium">
                  {currentEra.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm sm:leading-relaxed text-[#D8C7B8]">
                  {currentEra.description}
                </p>
              </div>

              {/* Archaeological Characteristics */}
              <div className="mt-5 flex flex-wrap gap-2">
                {currentEra.characteristics.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-[#FAF5F0]"
                  >
                    <Sparkles className="h-3 w-3 text-[#E5A344] shrink-0" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

