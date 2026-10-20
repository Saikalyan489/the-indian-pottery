import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Sparkles, Heart, Volume2, ArrowRight, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Vessel3DViewer } from './Vessel3DViewer';
import { ceramicAudio } from '../utils/audio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface VesselStudioSectionProps {
  onNavigateToMaking?: () => void;
  onNavigateToBeforePottery?: () => void;
}

export const VesselStudioSection: React.FC<VesselStudioSectionProps> = ({
  onNavigateToMaking,
  onNavigateToBeforePottery,
}) => {
  const { ui } = useLanguage();
  const shouldReduceMotion = usePrefersReducedMotion();
  const [chimePlaying, setChimePlaying] = useState<boolean>(false);

  const playChime = () => {
    ceramicAudio.playPotSound(820);
    setChimePlaying(true);
    setTimeout(() => {
      setChimePlaying(false);
    }, 700);
  };

  return (
    <section
      id="studio"
      className="scroll-mt-24 border-b border-[#B8582B]/20 bg-gradient-to-b from-[#0c0a09] via-[#140f0c] to-[#0c0a09] text-[#FAF5F0] py-4 sm:py-5 lg:py-6"
      aria-labelledby="studio-heading"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Section Header - Compact so the section fits cleanly on screen */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center mb-3.5"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5A344]/35 bg-[#B8582B]/15 px-3 py-0.5 text-[11px] font-mono uppercase tracking-widest text-[#E5A344] shadow-inner mb-1.5">
            <Box className="h-3 w-3 text-[#E5A344]" />
            <span>{ui.studio.badge}</span>
          </div>

          <h2
            id="studio-heading"
            className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#FAF5F0]"
          >
            {ui.studio.title}
          </h2>

          <p className="mt-1 font-sans text-xs text-[#D8C7B8] max-w-xl mx-auto">
            {ui.studio.subtitle}
          </p>
        </motion.div>

        {/* Side-by-Side Modern Grid Layout: 3D Illustration & Balanced Heritage Content */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch"
        >
          {/* Left Column: Interactive 3D Vessel Viewer (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310] to-[#221813] p-3.5 sm:p-4 shadow-xl lg:col-span-7">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5A344]">
                  {ui.studio.specimen}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D8C7B8]">
                {ui.studio.hint}
              </span>
            </div>

            <Vessel3DViewer
              initialVessel="matka"
              showControls={true}
              height="h-[220px] sm:h-[250px] md:h-[270px]"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2 text-[10px] font-mono text-[#D8C7B8]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>{ui.studioExtras.uniformWall}</span>
              </span>
              <span className="text-amber-300">{ui.studioExtras.indusToModern}</span>
            </div>
          </div>

          {/* Right Column: Cultural Heritage & Acoustic Lab - Completely Balanced with NO Empty Space (5 cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5A344]/40 bg-gradient-to-b from-[#1E1612]/95 via-[#2A1D16]/95 to-[#17110E]/95 p-4 sm:p-4.5 shadow-xl backdrop-blur-xl lg:col-span-5">
            {/* Ambient Warm Golden Radiance */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#E5A344]/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#B8582B]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="space-y-2.5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5A344]/40 bg-black/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-amber-300 backdrop-blur-md">
                <Heart className="h-2.5 w-2.5 text-amber-400 fill-amber-400 animate-pulse" />
                <span>{ui.studioExtras.quoteBadge}</span>
                <Sparkles className="h-2.5 w-2.5 text-amber-400" />
              </div>

              {/* Poetic & Moving Quote */}
              <blockquote className="font-display text-xs sm:text-sm font-bold text-[#FAF5F0] leading-snug tracking-tight border-l-2 border-[#E5A344] pl-2.5">
                {ui.studioExtras.quote}
              </blockquote>

              <p className="font-sans text-[11px] text-[#D8C7B8] leading-tight">
                {ui.studioExtras.quoteSub}
              </p>

              {/* Heritage Highlights 2x2 Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <span className="block text-[#E5A344] font-bold text-xs">{ui.studioExtras.stats.yearsVal}</span>
                  <span className="text-[10px] text-[#D8C7B8]">{ui.studioExtras.stats.yearsLabel}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <span className="block text-[#E5A344] font-bold text-xs">{ui.studioExtras.stats.earthVal}</span>
                  <span className="text-[10px] text-[#D8C7B8]">{ui.studioExtras.stats.earthLabel}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <span className="block text-emerald-400 font-bold text-xs">{ui.studioExtras.stats.wasteVal}</span>
                  <span className="text-[10px] text-[#D8C7B8]">{ui.studioExtras.stats.wasteLabel}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-2">
                  <span className="block text-amber-300 font-bold text-xs">{ui.studioExtras.stats.handsVal}</span>
                  <span className="text-[10px] text-[#D8C7B8]">{ui.studioExtras.stats.handsLabel}</span>
                </div>
              </div>

              {/* Interactive Acoustic Ring Test Card - Fills the Space with Educational Purpose */}
              <div className="rounded-xl border border-[#E5A344]/30 bg-black/50 p-2.5 backdrop-blur-sm shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-300 flex items-center gap-1.5">
                    <Volume2 className="h-3 w-3 text-[#E5A344]" />
                    {ui.studio.acousticTitle}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {ui.studioExtras.acousticHz}
                  </span>
                </div>
                <p className="text-[10px] text-[#D8C7B8] mt-1 leading-tight">
                  {ui.studio.acousticDesc}
                </p>
                <button
                  onClick={playChime}
                  className={`mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition-all shadow-md active:scale-98 ${
                    chimePlaying
                      ? 'bg-amber-400 text-black scale-102 ring-2 ring-amber-300'
                      : 'bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] text-white hover:brightness-110'
                  }`}
                  title={ui.studio.tapSound}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>{chimePlaying ? ui.studio.soundPlaying : ui.studio.tapSound}</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Footer */}
            <div className="flex gap-2 pt-2 border-t border-white/10 mt-2">
              {onNavigateToBeforePottery && (
                <button
                  onClick={onNavigateToBeforePottery}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-[11px] font-mono text-[#D8C7B8] transition-all hover:bg-white/10 hover:text-white"
                >
                  <BookOpen className="h-3 w-3 text-[#E5A344]" />
                  <span>{ui.studioExtras.beforePots}</span>
                </button>
              )}

              {onNavigateToMaking && (
                <button
                  onClick={onNavigateToMaking}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-white/10 border border-[#E5A344]/30 px-2 py-1.5 text-[11px] font-mono font-bold text-amber-200 transition-all hover:bg-white/15"
                >
                  <span>{ui.studioExtras.howPotsMade}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
