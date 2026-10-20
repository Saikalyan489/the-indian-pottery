import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Disc,
  Droplets,
  Box,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

type WorkshopHotspot = 'clay' | 'wheel' | 'kiln';

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { content, ui } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<WorkshopHotspot>('wheel');
  const shouldReduceMotion = usePrefersReducedMotion();

  const handleHotspotClick = (spot: WorkshopHotspot) => {
    setActiveHotspot(spot);
  };

  const hotspotInfo = {
    clay: {
      title: ui.heroExtras.hotspots.clay.title,
      desc: ui.heroExtras.hotspots.clay.desc,
      badge: ui.heroExtras.hotspots.clay.badge,
      pin: ui.heroExtras.hotspots.clay.pin,
      icon: <Droplets className="h-4 w-4 text-sky-400" />,
    },
    wheel: {
      title: ui.heroExtras.hotspots.wheel.title,
      desc: ui.heroExtras.hotspots.wheel.desc,
      badge: ui.heroExtras.hotspots.wheel.badge,
      pin: ui.heroExtras.hotspots.wheel.pin,
      icon: <Disc className="h-4 w-4 text-amber-400" />,
    },
    kiln: {
      title: ui.heroExtras.hotspots.kiln.title,
      desc: ui.heroExtras.hotspots.kiln.desc,
      badge: ui.heroExtras.hotspots.kiln.badge,
      pin: ui.heroExtras.hotspots.kiln.pin,
      icon: <Flame className="h-4 w-4 text-orange-400" />,
    },
  };

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-[#140E0B] text-[#FAF5F0] pt-6 pb-8 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Cinematic Background Image of Master Potter Workshop with Layered Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-workshop.jpg"
          alt="Traditional Indian pottery workshop bathed in golden sunlight"
          className="h-full w-full object-cover object-center brightness-[0.72] contrast-[1.12]"
        />
        {/* Multilayered high-contrast radial & linear overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140E0B]/98 via-[#1C1410]/90 to-[#140E0B]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0B] via-transparent to-[#140E0B]/80" />
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#B8582B]/20 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full bg-[#E5A344]/15 blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heritage Story Badge */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-5 flex flex-wrap items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A344]/40 bg-[#1F1713]/90 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#F59E0B] shadow-lg backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#F59E0B] animate-spin-slow" />
            <span>{content.hero.badge}</span>
          </div>

          <span className="font-mono text-xs text-[#E8DFD7]/70 hidden sm:inline">
            {ui.heroExtras.digitalExhibition}
          </span>
        </motion.div>

        {/* Two-Column Modern Editorial Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Bold Modern Typography & Interactive Actions (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col lg:col-span-7"
          >
            {/* Tagline */}
            <p className="font-sans text-sm sm:text-base font-semibold tracking-widest text-[#E5A344] uppercase">
              {content.hero.tagline}
            </p>

            {/* Main Modern Headline */}
            <h1
              id="hero-heading"
              className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF5F0] leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-[#FAF5F0] via-[#F4A261] to-[#E5A344] bg-clip-text text-transparent">
                {content.hero.headline}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 font-display text-xl sm:text-2xl font-bold text-[#D8A589]">
              {content.hero.headlineAccent}
            </p>

            {/* Student & Visitor Narrative */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#E8DFD7]/90 max-w-2xl font-sans">
              {content.hero.intro}
            </p>

            {/* High-Contrast Craft Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-white/15 py-4 bg-black/40 rounded-2xl px-4 backdrop-blur-md">
              {content.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[11px] font-mono tracking-wider text-[#D8A589] uppercase">
                    {stat.label}
                  </p>
                  <p className="font-display text-lg sm:text-xl font-bold text-[#FAF5F0] mt-0.5">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('before-pottery')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-102 active:scale-98"
                aria-label="Explore the Story"
              >
                <span>{content.hero.primaryBtn}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('potter-game')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5A344]/50 bg-black/40 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#FAF5F0] transition-all duration-300 hover:border-[#E5A344] hover:bg-black/60 hover:shadow-md active:scale-98"
                aria-label="Play 3D Potter's Wheel Game"
              >
                <Flame className="h-4 w-4 text-[#F59E0B] animate-pulse" />
                <span>{ui.heroExtras.playGame}</span>
              </button>

              <button
                onClick={() => onNavigate('studio')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/30 px-5 py-3.5 text-sm font-semibold tracking-wide text-[#E8DFD7] transition-all duration-300 hover:border-white/40 hover:bg-black/50 active:scale-98"
                aria-label="Go to 3D Vessel Studio"
              >
                <Box className="h-4 w-4 text-[#E5A344]" />
                <span>{ui.heroExtras.gallery}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Artisan Workshop Explorer (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#E5A344]/35 bg-gradient-to-b from-[#261C16]/95 to-[#19120E]/95 p-5 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#E5A344] font-bold">
                    {ui.heroExtras.masterStudio}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#D8A589]">
                  {ui.heroExtras.interactiveHotspots}
                </span>
              </div>

              {/* Interactive Workshop Visual with Hotspots */}
              <div className="relative mt-3.5 aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <img
                  src="/images/hero/hero-workshop.jpg"
                  alt="Potter at work"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />

                {/* Hotspot 1: Clay & Water Basin (Bottom-Left) */}
                <button
                  onClick={() => handleHotspotClick('clay')}
                  className={`group absolute top-[82%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border-2 transition-all ${
                    activeHotspot === 'clay'
                      ? 'border-sky-400 bg-sky-500/90 text-white scale-110 shadow-lg shadow-sky-500/50'
                      : 'border-white/80 bg-black/70 text-white/90 hover:scale-110 hover:border-sky-300'
                  } px-2.5 py-1 backdrop-blur-md`}
                  title={hotspotInfo.clay.title}
                >
                  <Droplets className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-mono font-bold tracking-tight">{hotspotInfo.clay.pin}</span>
                </button>

                {/* Hotspot 2: Potter's Wheel (Center) */}
                <button
                  onClick={() => handleHotspotClick('wheel')}
                  className={`group absolute top-[56%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border-2 transition-all ${
                    activeHotspot === 'wheel'
                      ? 'border-amber-400 bg-amber-500/90 text-white scale-110 shadow-lg shadow-amber-500/50'
                      : 'border-white/80 bg-black/70 text-white/90 hover:scale-110 hover:border-amber-300'
                  } px-2.5 py-1 backdrop-blur-md`}
                  title={hotspotInfo.wheel.title}
                >
                  <Disc className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-mono font-bold tracking-tight">{hotspotInfo.wheel.pin}</span>
                </button>

                {/* Hotspot 3: Wood-Fired Kiln (Top-Right) */}
                <button
                  onClick={() => handleHotspotClick('kiln')}
                  className={`group absolute top-[26%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border-2 transition-all ${
                    activeHotspot === 'kiln'
                      ? 'border-orange-400 bg-orange-500/90 text-white scale-110 shadow-lg shadow-orange-500/50'
                      : 'border-white/80 bg-black/70 text-white/90 hover:scale-110 hover:border-orange-300'
                  } px-2.5 py-1 backdrop-blur-md`}
                  title={hotspotInfo.kiln.title}
                >
                  <Flame className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-mono font-bold tracking-tight">{hotspotInfo.kiln.pin}</span>
                </button>
              </div>

              {/* Dynamic Hotspot Information Panel */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {hotspotInfo[activeHotspot].icon}
                    <h3 className="font-display text-sm font-bold text-[#FAF5F0]">
                      {hotspotInfo[activeHotspot].title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-[#D8A589]">
                    {hotspotInfo[activeHotspot].badge}
                  </span>
                </div>

                <p className="mt-2 text-xs text-[#E8DFD7]/85 leading-relaxed font-sans">
                  {hotspotInfo[activeHotspot].desc}
                </p>

                {/* Hotspot Selector Pills */}
                <div className="mt-3 flex gap-2">
                  {(['clay', 'wheel', 'kiln'] as WorkshopHotspot[]).map((spot) => (
                    <button
                      key={spot}
                      onClick={() => handleHotspotClick(spot)}
                      className={`flex-1 rounded-lg py-1 text-[11px] font-mono capitalize transition-all ${
                        activeHotspot === spot
                          ? 'bg-[#B8582B] text-white font-bold shadow-xs'
                          : 'bg-white/5 text-[#D8A589] hover:bg-white/10'
                      }`}
                    >
                      {spot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Scroll to 3D Exhibition */}
              <button
                onClick={() => onNavigate('studio')}
                className="mt-3.5 w-full flex items-center justify-center gap-2 rounded-xl border border-[#E5A344]/40 bg-gradient-to-r from-[#B8582B]/30 to-[#E5A344]/30 py-2.5 text-xs font-mono font-bold text-[#FAF5F0] transition-all hover:bg-white/15"
              >
                <Compass className="h-3.5 w-3.5 text-[#E5A344]" />
                <span>{ui.heroExtras.scrollToStudio}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
