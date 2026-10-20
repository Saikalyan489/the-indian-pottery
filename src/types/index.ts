export interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
  href: string;
  number: string;
}

export interface SectionContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fascinatingFact: string;
  highlights: string[];
  upcomingNote?: string;
}

export interface HeroContent {
  tagline: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  primaryBtn: string;
  secondaryBtn: string;
  stats: Array<{ label: string; value: string }>;
  showcaseCard: {
    title: string;
    description: string;
    badge: string;
    craftDetails: string;
  };
}

export interface PotteryMakingStage {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  techniqueNote: string;
  image: {
    src: string;
    alt: string;
    aspectRatio: string;
    caption?: string;
    credit?: string;
    requiredFilename: string;
  };
  iconName: string;
}

export interface PotteryMakingContent {
  sectionTitle: string;
  introText: string;
  techniqueNotice: string;
  stages: PotteryMakingStage[];
}

export interface FooterContent {
  about: string;
  sectionsTitle: string;
  creditsTitle: string;
  creditsText: string;
  copyright: string;
  backToTop: string;
}

export interface SiteContent {
  brandName: string;
  tagline: string;
  navItems: NavItem[];
  menuLabel: string;
  sectionsNavLabel: string;
  hero: HeroContent;
  potteryMaking: PotteryMakingContent;
  sections: SectionContent[];
  footer: FooterContent;
}

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta' | 'ml' | 'kn';

export interface UiTranslations {
  languagePrompt: {
    main: string;
    sub: string;
  };
  civilizationBanner: {
    badge: string;
    title: string;
  };
  header: {
    allChapters: string;
    chapters: string;
    changeLanguage: string;
  };
  dock: {
    prev: string;
    next: string;
    chapters: string;
    top: string;
  };
  studio: {
    badge: string;
    title: string;
    subtitle: string;
    specimen: string;
    hint: string;
    acousticTitle: string;
    acousticDesc: string;
    tapSound: string;
    soundPlaying: string;
    craftDetails: string;
    labels: {
      clay: string;
      vitrification: string;
      era: string;
      use: string;
    };
  };
  game: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    proceedFiring: string;
    igniteKiln: string;
    firingAt: string;
    tapRing: string;
    createAnother: string;
    sliders: {
      bellyWidth: string;
      rimFlare: string;
      heightRatio: string;
      baseFooting: string;
    };
    modes: {
      sliders: string;
      shapes: string;
      gestures: string;
    };
  };
  general: {
    exploreTopic: string;
    keyHighlights: string;
    didYouKnow: string;
    nextChapter: string;
  };
  developer: {
    label: string;
    designedBy: string;
    name: string;
    role: string;
    email: string;
    viewDetails: string;
    craftNote: string;
    dedication: string;
    knowAbout: string;
  };
  studioExtras: {
    uniformWall: string;
    indusToModern: string;
    quoteBadge: string;
    quote: string;
    quoteSub: string;
    stats: {
      yearsVal: string;
      yearsLabel: string;
      earthVal: string;
      earthLabel: string;
      wasteVal: string;
      wasteLabel: string;
      handsVal: string;
      handsLabel: string;
    };
    acousticHz: string;
    beforePots: string;
    howPotsMade: string;
  };
  gameExtras: {
    step1Badge: string;
    step2Badge: string;
    step3Badge: string;
    traditionalForm: string;
    artisanGestures: string;
    gestures: {
      expandBelly: string;
      constrictWaist: string;
      flareRim: string;
      tightenCollar: string;
    };
    chooseSlip: string;
    slips: {
      terracotta: { name: string; desc: string };
      nbpw: { name: string; desc: string };
      harappan: { name: string; desc: string };
    };
    kilnHeat: string;
    tempStatus: {
      ambient: string;
      steam: string;
      quartz: string;
      vitrified: string;
    };
    flawless: string;
    resonanceTitle: string;
    pureTone: string;
    tipClickPot: string;
    specs: {
      profile: string;
      slipGlaze: string;
      kilnTempLabel: string;
      vitrifiedStatus: string;
    };
    changeSlip: string;
    orbitHint: string;
    presets: {
      matka: { label: string; desc: string };
      surahi: { label: string; desc: string };
      handi: { label: string; desc: string };
      harappan: { label: string; desc: string };
    };
  };
  makingExtras: {
    badge: string;
    stage: string;
    processStageOf: string;
    regionalTechnique: string;
    prev: string;
    next: string;
    spinWheel: string;
    celebrate: string;
  };
  coolingExtras: {
    badge: string;
    zeroWatts: string;
    matkaTitle: string;
    plasticTitle: string;
    steelTitle: string;
    matkaSub: string;
    plasticSub: string;
    steelSub: string;
    microPoresOn: string;
    microPoresOff: string;
    selectMaterial: string;
    clay: { label: string; note: string; fact: string };
    plastic: { label: string; note: string; fact: string };
    steel: { label: string; note: string; fact: string };
    summerTemp: string;
    outsideAir: string;
    waterInside: string;
  };
  heroExtras: {
    digitalExhibition: string;
    playGame: string;
    gallery: string;
    masterStudio: string;
    interactiveHotspots: string;
    scrollToStudio: string;
    hotspots: {
      clay: { title: string; desc: string; badge: string; pin: string };
      wheel: { title: string; desc: string; badge: string; pin: string };
      kiln: { title: string; desc: string; badge: string; pin: string };
    };
  };
  scrubberExtras: {
    badge: string;
    title: string;
    subtitle: string;
    scrubHint: string;
    specimenSite: string;
    characteristics: string;
    eras: Array<{
      id: string;
      year: string;
      title: string;
      subtitle: string;
      archaeologicalSite: string;
      characteristics: string[];
      description: string;
      specimen: string;
    }>;
  };
  quoteBanner: {
    badge: string;
    quote: string;
    attribution: string;
  };
}
