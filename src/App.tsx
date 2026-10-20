import { useState, useEffect, useCallback } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { MobileBottomDock } from './components/MobileBottomDock';
import { CivilizationTitleBanner } from './components/CivilizationTitleBanner';
import { HeroSection } from './components/HeroSection';
import { VesselStudioSection } from './components/VesselStudioSection';
import { SectionPlaceholder } from './components/SectionPlaceholder';
import { PotteryMakingSection } from './components/PotteryMakingSection';
import { PottersWheelGame } from './components/PottersWheelGame';
import { SiteFooter } from './components/SiteFooter';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppMain() {
  const { content } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [chaptersOpen, setChaptersOpen] = useState<boolean>(false);

  // Smooth scroll handler taking into account user motion preferences
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
      // Update browser URL hash cleanly without jumping
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  // Track window scroll progress for top indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect active section dynamically on scroll
  useEffect(() => {
    const sectionIds = ['home', 'studio', ...content.sections.map((s) => s.id), 'potter-game'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Observe all sections with rootMargin biased towards the top reading area
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topEntry = visibleEntries[0];
          if (topEntry?.target.id) {
            setActiveSection(topEntry.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Handle initial load with hash if present
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [scrollToSection]);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0c0a09] text-[#FAF5F0] selection:bg-[#B8582B]/30 selection:text-amber-200">
      {/* Persistent Atmospheric Earthen Background Texture & Depth Glows (Visible Even While Scrolling) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft upper terracotta glow */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#B8582B]/14 blur-[140px]" />
        {/* Mid-page golden amber ambient aura */}
        <div className="absolute top-1/3 -right-40 h-[700px] w-[700px] rounded-full bg-[#E5A344]/9 blur-[160px]" />
        {/* Lower page deep kiln ember glow */}
        <div className="absolute bottom-1/4 -left-32 h-[650px] w-[650px] rounded-full bg-[#9E3E18]/12 blur-[150px]" />
        {/* Subtle vignette along viewport edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Top Dynamic Story Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#B8582B] via-[#E5A344] to-[#F59E0B] shadow-[0_0_10px_#E5A344] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#B8582B] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Sticky Top Navigation */}
      <SiteHeader
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isChaptersOpen={chaptersOpen}
        onOpenChapters={() => setChaptersOpen(true)}
        onCloseChapters={() => setChaptersOpen(false)}
      />

      {/* Main Story Content */}
      <main id="main-content" className="relative z-10 flex-1">
        {/* Monumental Civilization Heritage Heading Banner */}
        <CivilizationTitleBanner />

        {/* Section 01: Hero */}
        <HeroSection onNavigate={scrollToSection} />

        {/* Dedicated 3D Digital Vessel Gallery & Cultural Dedication (Side-by-Side) */}
        <VesselStudioSection
          onNavigateToMaking={() => scrollToSection('making')}
          onNavigateToBeforePottery={() => scrollToSection('before-pottery')}
        />

        {/* Sections 02 to 09: Chapters 02 to 09 */}
        {content.sections.map((section, index) => {
          const nextIndex = index + 1;
          const nextSection = content.sections[nextIndex];
          const nextSectionNav = nextSection
            ? content.navItems.find((n) => n.id === nextSection.id)
            : undefined;

          // Chapter 06 is our dedicated interactive pottery-making explorer!
          if (section.id === 'making') {
            return (
              <div key={section.id}>
                {/* How a Clay Pot is Made with the 5 ordered photographs */}
                <PotteryMakingSection content={content.potteryMaking} />

                {/* Interactive 3D Potter's Wheel Game right after the making process */}
                <PottersWheelGame />
              </div>
            );
          }

          return (
            <SectionPlaceholder
              key={section.id}
              section={section}
              isEven={index % 2 === 0}
              onNavigateNext={
                nextSection ? () => scrollToSection(nextSection.id) : undefined
              }
              nextSectionLabel={nextSectionNav?.label}
            />
          );
        })}
      </main>

      {/* Mobile Floating Chapter Navigation Dock */}
      <MobileBottomDock
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenChapters={() => setChaptersOpen(true)}
      />

      {/* Footer */}
      <SiteFooter onNavigate={scrollToSection} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppMain />
    </LanguageProvider>
  );
}

export default App;
