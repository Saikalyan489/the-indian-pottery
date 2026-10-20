import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../context/LanguageContext';
import {
  Droplets,
  Disc,
  Sun,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Image as ImageIcon,
  RotateCw,
} from 'lucide-react';
import type { PotteryMakingContent, PotteryMakingStage } from '../types';

interface PotteryMakingSectionProps {
  content: PotteryMakingContent;
}

export const PotteryMakingSection: React.FC<PotteryMakingSectionProps> = ({ content }) => {
  const { ui } = useLanguage();
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isWheelSpinning, setIsWheelSpinning] = useState<boolean>(false);
  const tabListRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();

  const currentStage: PotteryMakingStage = content.stages[activeStageIndex];
  const totalStages = content.stages.length;

  const triggerStageCelebration = (idx: number) => {
    if (idx === 4) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#B8582B', '#FF6B35', '#F4A261', '#E76F51'],
        });
      } catch (_) {}
    }
  };

  const selectStage = (idx: number) => {
    setActiveStageIndex(idx);
    triggerStageCelebration(idx);
  };

  const handleNext = () => {
    if (activeStageIndex < totalStages - 1) {
      const nextIdx = activeStageIndex + 1;
      setActiveStageIndex(nextIdx);
      triggerStageCelebration(nextIdx);
    }
  };

  const handlePrev = () => {
    if (activeStageIndex > 0) {
      const prevIdx = activeStageIndex - 1;
      setActiveStageIndex(prevIdx);
      triggerStageCelebration(prevIdx);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = activeStageIndex < totalStages - 1 ? activeStageIndex + 1 : 0;
      selectStage(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = activeStageIndex > 0 ? activeStageIndex - 1 : totalStages - 1;
      selectStage(prev);
    }
  };

  const spinStageWheel = () => {
    setIsWheelSpinning(true);
    setTimeout(() => setIsWheelSpinning(false), 1200);
  };

  const getStageIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Disc':
        return <Disc className={className} />;
      case 'Sun':
        return <Sun className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Sparkles':
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section
      id="making"
      className="scroll-mt-24 border-b border-[#B8582B]/20 bg-gradient-to-b from-[#0d0a08] via-[#15100c] to-[#0d0a08] text-[#FAF5F0] py-8 sm:py-10 lg:py-12"
      aria-labelledby="pottery-making-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A344]/35 bg-[#B8582B]/15 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#E5A344] shadow-inner">
            <Disc className="h-3.5 w-3.5 text-[#E5A344] animate-spin-slow" />
            <span>{ui.makingExtras.badge}</span>
          </div>

          <h2
            id="pottery-making-title"
            className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#FAF5F0]"
          >
            {content.sectionTitle}
          </h2>

          <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#E5A344] font-medium max-w-xl mx-auto">
            "{content.introText}"
          </p>
        </div>

        {/* Stage Navigation Tabs */}
        <div className="mt-4 sm:mt-5">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Pottery making stages"
            onKeyDown={handleKeyDown}
            className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none"
          >
            {content.stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  id={`stage-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectStage(idx)}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#E5A344] active:scale-95 ${
                    isActive
                      ? 'border-[#E5A344] bg-[#B8582B]/25 shadow-lg text-white scale-102'
                      : 'border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20 text-[#D8C7B8]'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#B8582B] to-[#E5A344] text-white shadow-md'
                        : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                    }`}
                  >
                    {stage.number}
                  </span>

                  <div className="flex flex-col">
                    <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-[#FAF5F0]">
                      {stage.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#E5A344] hidden sm:inline">
                      {ui.makingExtras.stage} {stage.number}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-stage-indicator"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#E5A344] rounded-full"
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Display Area */}
        <div className="mt-4 sm:mt-6 rounded-3xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310]/95 to-[#1c1511]/95 p-4 sm:p-6 lg:p-7 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              id={`stage-panel-${currentStage.id}`}
              role="tabpanel"
              aria-labelledby={`stage-tab-${currentStage.id}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8"
            >
              {/* Left Column: Visual Showcase (6 cols) */}
              <div className="lg:col-span-6">
                <div className="relative h-[220px] sm:h-[260px] md:h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                  {!imageErrors[currentStage.id] ? (
                    <img
                      src={currentStage.image.src}
                      alt={currentStage.image.alt}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [currentStage.id]: true }))
                      }
                      loading="lazy"
                    />
                  ) : (
                    /* Clean Artisanal Frame */
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 text-center bg-radial from-[#241A14] to-[#120E0C]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B8582B]/20 text-[#E5A344] shadow-inner mb-3">
                        {getStageIcon(currentStage.iconName, 'w-8 h-8')}
                      </div>

                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5A344]">
                        Stage {currentStage.number} Visual
                      </span>

                      <p className="mt-1 font-display text-lg font-bold text-[#FAF5F0]">
                        {currentStage.title}
                      </p>

                      <p className="mt-1 max-w-xs text-xs text-[#D8C7B8] leading-relaxed">
                        {currentStage.image.caption}
                      </p>

                      <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-mono text-[#D8C7B8]">
                        <ImageIcon className="h-3.5 w-3.5 text-[#E5A344]" />
                        <span>File: {currentStage.image.requiredFilename}</span>
                      </div>
                    </div>
                  )}

                  {/* Stage Badge Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-lg bg-black/75 border border-white/10 px-3 py-1 text-xs font-mono text-white backdrop-blur-xs">
                    <span>{ui.makingExtras.stage} {currentStage.number} / 05</span>
                  </div>

                  {/* Stage-specific micro-action button overlay */}
                  {currentStage.id === 2 && (
                    <button
                      onClick={spinStageWheel}
                      className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/75 border border-[#E5A344]/40 px-2.5 py-1 text-xs font-mono font-semibold text-amber-300 shadow-lg hover:bg-[#E5A344] hover:text-black transition-all active:scale-95"
                    >
                      <RotateCw className={`h-3.5 w-3.5 ${isWheelSpinning ? 'animate-spin' : ''}`} />
                      <span>{ui.makingExtras.spinWheel}</span>
                    </button>
                  )}

                  {currentStage.id === 5 && (
                    <button
                      onClick={() => {
                        try {
                          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                        } catch (_) {}
                      }}
                      className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#B8582B] to-[#E5A344] px-3 py-1 text-xs font-mono font-semibold text-white shadow-lg hover:scale-105 transition-all active:scale-95 animate-bounce"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{ui.makingExtras.celebrate}</span>
                    </button>
                  )}

                  {/* Caption & Credit Bar */}
                  {currentStage.image.caption && !imageErrors[currentStage.id] && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5 pt-7 text-xs text-[#FAF5F0]">
                      <p className="font-sans font-medium leading-snug">{currentStage.image.caption}</p>
                      {currentStage.image.credit && (
                        <p className="mt-0.5 text-[10px] font-mono text-amber-300/80">
                          Credit: {currentStage.image.credit}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Stage Narrative & Controls (6 cols) */}
              <div className="flex flex-col justify-between lg:col-span-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5A344] uppercase tracking-wider">
                    {getStageIcon(currentStage.iconName, 'w-4 h-4')}
                    <span>{ui.makingExtras.processStageOf} {currentStage.number} / 05</span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF5F0]">
                    {currentStage.title}
                  </h3>

                  <p className="mt-1 font-sans text-base sm:text-lg font-semibold text-[#E5A344]">
                    {currentStage.subtitle}
                  </p>

                  <p className="mt-4 text-base leading-relaxed text-[#D8C7B8]">
                    {currentStage.description}
                  </p>

                  {/* Regional Technique Callout */}
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-[#FAF5F0]">
                    <div className="flex items-center gap-1.5 font-mono font-semibold uppercase tracking-wider text-[#E5A344]">
                      <Info className="h-3.5 w-3.5 text-[#E5A344]" />
                      <span>{ui.makingExtras.regionalTechnique}</span>
                    </div>
                    <p className="mt-1.5 leading-relaxed text-[#D8C7B8]">
                      {currentStage.techniqueNote}
                    </p>
                  </div>
                </div>

                {/* Previous / Next Controls */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handlePrev}
                      disabled={activeStageIndex === 0}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-xs font-semibold text-[#D8C7B8] transition-all hover:border-white/30 hover:bg-black/60 disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#E5A344] active:scale-95"
                      aria-label="Go to previous stage"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>{ui.makingExtras.prev}</span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={activeStageIndex === totalStages - 1}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all hover:scale-102 disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#E5A344] active:scale-95"
                      aria-label="Go to next stage"
                    >
                      <span>{ui.makingExtras.next}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress Counter */}
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#E5A344]">
                    <span className="font-bold text-sm text-white">{activeStageIndex + 1}</span>
                    <span className="text-white/40">/</span>
                    <span>{totalStages}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Diversity Notice */}
        <p className="mt-6 text-center text-xs text-[#D8C7B8]/70 max-w-2xl mx-auto font-sans">
          {content.techniqueNotice}
        </p>
      </div>
    </section>
  );
};
