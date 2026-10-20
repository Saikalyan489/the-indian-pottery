import React from 'react';
import { PotteryLogo } from './PotteryLogo';
import { ArrowUp, BookCheck, Code2, Heart, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const { content, ui } = useLanguage();
  const scrollToTop = () => {
    onNavigate('home');
  };

  const handleChapterClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer
      className="border-t border-white/10 bg-[#090706] text-[#FAF5F0]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Brand & Project Summary (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <PotteryLogo size={38} />
              <span className="font-display text-2xl font-bold tracking-tight text-[#FAF5F0]">
                {content.brandName}
              </span>
            </div>

            <p className="mt-3.5 font-display text-base font-semibold text-[#E5A344]">
              "{content.tagline}"
            </p>

            <p className="mt-2.5 text-sm leading-relaxed text-[#E8DFD7]/80">
              {content.footer.about}
            </p>

            {/* Next Generation Dedication Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-mono text-amber-200">
              <Heart className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>{ui.developer.dedication}</span>
            </div>
          </div>

          {/* Chapters Quick Navigation (3 cols) */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E5A344]">
              {content.footer.sectionsTitle}
            </p>
            <ul className="mt-3.5 space-y-2 text-xs">
              {content.navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleChapterClick(item.id)}
                    className="group flex items-center gap-2 text-[#E8DFD7]/80 transition-colors hover:text-[#E5A344] focus-visible:outline-2 focus-visible:outline-[#B8582B] active:scale-95 text-left"
                  >
                    <span className="font-mono text-[10px] text-[#D8C7B8]/70 group-hover:text-[#E5A344]">
                      {item.number}
                    </span>
                    <span className="font-medium group-hover:translate-x-0.5 transition-transform">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources & Acknowledgements (4 cols) */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-inner">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#E5A344]">
                <BookCheck className="h-4 w-4 text-[#E5A344]" />
                <span>{content.footer.creditsTitle}</span>
              </div>

              <p className="mt-2.5 text-xs leading-relaxed text-[#E8DFD7]/80">
                {content.footer.creditsText}
              </p>
            </div>
          </div>
        </div>

        {/* Developer Credit & Dedication Section (Crafted and designed for the world by Sai Kalyan Annavarapu) */}
        <div
          id="developer"
          className="mt-12 scroll-mt-28 rounded-3xl border border-[#E5A344]/45 bg-gradient-to-r from-[#1E1510] via-[#2A1D15] to-[#1E1510] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle golden ambient background glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#E5A344]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#B8582B]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/50 px-3.5 py-1 text-xs font-mono tracking-wider text-amber-300 uppercase shadow-inner">
                <Code2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{ui.developer.designedBy}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FAF5F0] tracking-tight">
                {ui.developer.name}
              </h3>

              <p className="text-xs text-[#D8C7B8] max-w-2xl leading-relaxed">
                {ui.developer.craftNote}
              </p>
            </div>

            {/* Email Contact with Mail Symbol */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href={`mailto:${ui.developer.email}`}
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-[#E5A344] bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-5 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-102 hover:shadow-[0_0_24px_rgba(229,163,68,0.4)] active:scale-98"
                aria-label={`Send email to ${ui.developer.name}`}
              >
                <Mail className="h-4 w-4 text-white group-hover:rotate-6 transition-transform" />
                <span className="font-mono">{ui.developer.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs text-[#E8DFD7]/60 gap-3">
          <p>{content.footer.copyright}</p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3.5 py-2 font-mono text-xs text-[#FAF5F0] transition-all hover:border-[#E5A344] hover:text-[#E5A344] focus-visible:outline-2 focus-visible:outline-[#B8582B] active:scale-95"
            aria-label="Return to top of page"
          >
            <span>{content.footer.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#E5A344] transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
