import type { SiteContent } from '../types';
import { SITE_IMAGES } from '../data/images';

export const knContent: SiteContent = {
  brandName: 'ದಿ ಇಂಡಿಯನ್ ಪಾಟರಿ',
  tagline: 'ಕಾಲದ ಹರಿವಿನಲ್ಲಿ ಮೈದಾಳಿದ ಭಾರತೀಯ ಮೃತ್ಪಾತ್ರ ಕಲೆಯ ವೈಭವ.',
  menuLabel: 'ಅಧ್ಯಾಯಗಳು',
  sectionsNavLabel: 'ಕಥೆಯ ಅಧ್ಯಾಯಗಳು',

  navItems: [
    { id: 'home', label: 'ಆರಂಭ', shortLabel: 'ಹೋಮ್', href: '#home', number: '01' },
    { id: 'before-pottery', label: 'ಮಡಕೆಗಳ ಮುಂಚಿನ ಕಾಲ', shortLabel: 'ಪೂರ್ವ ಕಾಲ', href: '#before-pottery', number: '02' },
    { id: 'origins', label: 'ಮಡಕೆ ಕಲೆಯ ಉಗಮ', shortLabel: 'ಉಗಮ', href: '#origins', number: '03' },
    { id: 'ancient-india', label: 'ಪ್ರಾಚೀನ ಭಾರತ', shortLabel: 'ಪ್ರಾಚೀನ', href: '#ancient-india', number: '04' },
    { id: 'objects', label: 'ದಿನನಿತ್ಯದ ಮಡಕೆಗಳು', shortLabel: 'ಮಡಕೆಗಳು', href: '#objects', number: '05' },
    { id: 'making', label: 'ಮಡಕೆ ಮಾಡುವ ವಿಧಾನ', shortLabel: 'ವಿಧಾನ', href: '#making', number: '06' },
    { id: 'everyday-life', label: 'ಜೀವನ ಮತ್ತು ಹಬ್ಬಗಳು', shortLabel: 'ಜೀವನ', href: '#everyday-life', number: '07' },
    { id: 'living-traditions', label: 'ಕುಂಬಾರ ಕುಶಲಕರ್ಮಿಗಳು', shortLabel: 'ಕುಂಬಾರರು', href: '#living-traditions', number: '08' },
    { id: 'today-tomorrow', label: 'ಇಂದು ಮತ್ತು ನಾಳೆ', shortLabel: 'ಇಂದು-ನಾಳೆ', href: '#today-tomorrow', number: '09' },
  ],

  hero: {
    tagline: 'ಕಾಲದ ಹರಿವಿನಲ್ಲಿ ಮೈದಾಳಿದ ಭಾರತೀಯ ಮೃತ್ಪಾತ್ರ ಕಲೆಯ ವೈಭವ.',
    badge: 'ಹತ್ತು ಸಾವಿರ ವರ್ಷಗಳ ಜೀವಂತ ಪರಂಪರೆ',
    headline: 'ನದಿಯ ಮೆಕ್ಕಲು ಮಣ್ಣಿನಿಂದ ಸಜೀವ ಕಲೆಯವರೆಗೆ',
    headlineAccent: 'ಭಾರತೀಯ ಮಣ್ಣಿನ ಮಡಕೆಗಳ ಕಥೆ',
    intro:
      'ಲೋಹ ಅಥವಾ ಪ್ಲಾಸ್ಟಿಕ್ ಬರುವ ಮುನ್ನವೇ, ನದಿಯ ಸಾಮಾನ್ಯ ಮಣ್ಣನ್ನು ಕೈಗಳಿಂದ ರೂಪಿಸಿ ಬೆಂಕಿಯ ಆವಿಗೆಯಲ್ಲಿ ಬೇಯಿಸಿದರೆ ತಣ್ಣನೆಯ ನೀರನ್ನು ಶೇಖರಿಸಲು ಮತ್ತು ರುಚಿಕರ ಅಡುಗೆ ಮಾಡಲು ಸಾಧ್ಯವೆಂದು ಮಾನವ ಕಂಡುಕೊಂಡನು.',
    primaryBtn: 'ಇತಿಹಾಸ ತಿಳಿಯಿರಿ',
    secondaryBtn: 'ತಯಾರಿಸುವ ವಿಧಾನ ನೋಡಿ',
    stats: [
      { label: 'ಮೃತ್ಪಾತ್ರ ಇತಿಹಾಸ', value: '10,000+ ವರ್ಷಗಳು' },
      { label: 'ಸೃಷ್ಟಿ ಮೂಲಗಳು', value: 'ಭೂಮಿ, ನೀರು & ಬೆಂಕಿ' },
      { label: 'ಕುಂಬಾರ ಕುಟುಂಬಗಳು', value: 'ಜೀವಂತ ಪರಂಪರೆ' },
    ],
    showcaseCard: {
      title: 'ಕರಕುಶಲ ಟೆರಾಕೋಟಾ ಪಾತ್ರೆ',
      description:
        'ನದಿಯ ಮೆಕ್ಕಲು ಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ರೂಪಿಸಿ, ಆವಿಗೆಯಲ್ಲಿ ಗಟ್ಟಿಯಾಗಿ ಬೇಯಿಸಿದ ಅದ್ಭುತ ಪಾತ್ರೆ.',
      badge: 'ಟೆರಾಕೋಟಾ ಪಾತ್ರೆ',
      craftDetails: 'ನೈಸರ್ಗಿಕ ಮೆಕ್ಕಲು ಮಣ್ಣು • ಆವಿಗೆಯಲ್ಲಿ ಬೆಂದದ್ದು',
    },
  },

  potteryMaking: {
    sectionTitle: 'ಮಣ್ಣಿನ ಮಡಕೆ ಮಾಡುವ ವಿಧಾನ',
    introText:
      'ಒಂದು ಮಣ್ಣಿನ ಮಡಕೆ ಮೃದುವಾದ ಮಣ್ಣಿನಿಂದ ಆರಂಭವಾಗುತ್ತದೆ. ಕುಂಬಾರನ ತಾಳ್ಮೆ, ಕೌಶಲ್ಯ ಮತ್ತು ಬೆಂಕಿಯ ಶಾಖವು ಅದನ್ನು ನಿತ್ಯಬಳಕೆಯ ಸುಂದರ ಪಾತ್ರೆಯನ್ನಾಗಿ ಮಾಡುತ್ತದೆ.',
    techniqueNotice:
      'ಗಮನಿಸಿ: ಸ್ಥಳೀಯ ಮಣ್ಣಿನ ಗುಣ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಭಾರತೀಯ ಕುಂಬಾರರು ವಿಭಿನ್ನ ವಿಧಾನಗಳನ್ನು ಅನುಸರಿಸುತ್ತಾರೆ.',
    stages: [
      {
        id: 1,
        number: '01',
        title: 'ಮಣ್ಣನ್ನು ಸಿದ್ಧಪಡಿಸುವುದು',
        subtitle: 'ಅಗೆಯುವುದು, ಶುದ್ಧೀಕರಿಸುವುದು ಮತ್ತು ಕಾಲಿನಿಂದ ತುಳಿಯುವುದು',
        description:
          'ಕುಂಬಾರರು ನದಿ ಮತ್ತು ಕೆರೆಗಳ ತಳದಿಂದ ನುಣ್ಣನೆಯ ಮೆಕ್ಕಲು ಮಣ್ಣನ್ನು ತರುತ್ತಾರೆ. ಕಲ್ಲುಗಳನ್ನು ತೆಗೆದು, ಭತ್ತದ ಹೊಟ್ಟು ಮತ್ತು ಮರಳನ್ನು ಬೆರೆಸಿ ಕಾಲಿನಿಂದ ಚೆನ್ನಾಗಿ ಹದಗೊಳಿಸುತ್ತಾರೆ.',
        techniqueNote:
          'ಅನುಭವಿ ಕುಂಬಾರರು ಬೆರಳುಗಳಿಂದ ಮುಟ್ಟಿ ಮಣ್ಣಿನ ಸರಿಯಾದ ಹದವನ್ನು ಸುಲಭವಾಗಿ ಕಂಡುಕೊಳ್ಳುತ್ತಾರೆ.',
        image: {
          src: SITE_IMAGES.potteryMaking.stage1.src,
          alt: SITE_IMAGES.potteryMaking.stage1.alt,
          aspectRatio: SITE_IMAGES.potteryMaking.stage1.aspectRatio,
          caption: SITE_IMAGES.potteryMaking.stage1.caption,
          credit: SITE_IMAGES.potteryMaking.stage1.credit,
          requiredFilename: SITE_IMAGES.potteryMaking.stage1.requiredFilename,
        },
        iconName: 'Droplets',
      },
      {
        id: 2,
        number: '02',
        title: 'ಚಕ್ರದ ಮೇಲೆ ರೂಪಿಸುವುದು',
        subtitle: 'ತಿರುಗುವ ಚಕ್ರ ಮತ್ತು ಬಡಿಯುವ ಮರದ ಹಲಗೆಯ ಕಲೆ',
        description:
          'ಚಕ್ರದ ಮಧ್ಯೆ ಮಣ್ಣಿನ ಮುದ್ದೆಯಿಟ್ಟು ವೇಗವಾಗಿ ತಿರುಗಿಸುತ್ತಾ ಬೆರಳುಗಳಿಂದ ಆಕಾರ ನೀಡುತ್ತಾರೆ. ದೊಡ್ಡ ಮಡಕೆಗಳ ಹೊಟ್ಟೆಯನ್ನು ವಿಸ್ತರಿಸಲು ಒಳಗೆ ಕಲ್ಲು ಮತ್ತು ಹೊರಗೆ ಮರದ ಹಲಗೆಯಿಂದ ಬಡಿಯುತ್ತಾರೆ.',
        techniqueNote:
          'ಸಣ್ಣ ಕಪ್‌ಗಳು ಚಕ್ರದಲ್ಲೇ ಪೂರ್ಣಗೊಳ್ಳುತ್ತವೆ; ದೊಡ್ಡ ಮಡಕೆಗಳನ್ನು ಬಡಿದು ವಿಸ್ತರಿಸಲಾಗುತ್ತದೆ.',
        image: {
          src: SITE_IMAGES.potteryMaking.stage2.src,
          alt: SITE_IMAGES.potteryMaking.stage2.alt,
          aspectRatio: SITE_IMAGES.potteryMaking.stage2.aspectRatio,
          caption: SITE_IMAGES.potteryMaking.stage2.caption,
          credit: SITE_IMAGES.potteryMaking.stage2.credit,
          requiredFilename: SITE_IMAGES.potteryMaking.stage2.requiredFilename,
        },
        iconName: 'Disc',
      },
      {
        id: 3,
        number: '03',
        title: 'ಮಡಕೆಗಳನ್ನು ಒಣಗಿಸುವುದು',
        subtitle: 'ನೆರಳಿನಲ್ಲಿ ಮತ್ತು ಬೆಳಗಿನ ಎಳೆಯ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸುವುದು',
        description:
          'ಹಸಿ ಮಡಕೆಗಳಲ್ಲಿ ತೇವಾಂಶ ಹೆಚ್ಚಿರುತ್ತದೆ. ಮೊದಲು ನೆರಳಿನಲ್ಲಿ ನಿಧಾನವಾಗಿ ಒಣಗಿಸಿ, ನಂತರ ಬೆಳಗಿನ ಬಿಸಿಲಿನಲ್ಲಿ ಇಡಲಾಗುತ್ತದೆ.',
        techniqueNote:
          'ಒಣಗುವಿಕೆ ಸಮನಾಗಿರದಿದ್ದರೆ ಮಡಕೆಗಳು ಬಿರುಕು ಬಿಡುತ್ತವೆ.',
        image: {
          src: SITE_IMAGES.potteryMaking.stage3.src,
          alt: SITE_IMAGES.potteryMaking.stage3.alt,
          aspectRatio: SITE_IMAGES.potteryMaking.stage3.aspectRatio,
          caption: SITE_IMAGES.potteryMaking.stage3.caption,
          credit: SITE_IMAGES.potteryMaking.stage3.credit,
          requiredFilename: SITE_IMAGES.potteryMaking.stage3.requiredFilename,
        },
        iconName: 'Sun',
      },
      {
        id: 4,
        number: '04',
        title: 'ಆವಿಗೆಯಲ್ಲಿ ಬೇಯಿಸುವುದು',
        subtitle: 'ಬೆಂಕಿಯ ಜ್ವಾಲೆಯಲ್ಲಿ ಕಲ್ಲಿನಂತೆ ಗಟ್ಟಿಯಾಗುವ ಕೌತುಕ',
        description:
          'ನೂರಾರು ಮಡಕೆಗಳನ್ನು ಆವಿಗೆಯಲ್ಲಿ ಜೋಡಿಸಿ, ಹುಲ್ಲು ಮತ್ತು ಬೆರಣಿಗಳನ್ನು ಹೊದಿಸಿ 700°C ಗಿಂತ ಹೆಚ್ಚಿನ ತಾಪದಲ್ಲಿ ಗಂಟೆಗಳ ಕಾಲ ಬೇಯಿಸಲಾಗುತ್ತದೆ.',
        techniqueNote:
          'ಸಾಕಷ್ಟು ಗಾಳಿ ಸಿಕ್ಕರೆ ಮಡಕೆ ಕೆಂಪು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತದೆ, ಹೊಗೆಯನ್ನು ಮುಚ್ಚಿಟ್ಟರೆ ಕಪ್ಪು ಬಣ್ಣ ಬರುತ್ತದೆ!',
        image: {
          src: SITE_IMAGES.potteryMaking.stage4.src,
          alt: SITE_IMAGES.potteryMaking.stage4.alt,
          aspectRatio: SITE_IMAGES.potteryMaking.stage4.aspectRatio,
          caption: SITE_IMAGES.potteryMaking.stage4.caption,
          credit: SITE_IMAGES.potteryMaking.stage4.credit,
          requiredFilename: SITE_IMAGES.potteryMaking.stage4.requiredFilename,
        },
        iconName: 'Flame',
      },
      {
        id: 5,
        number: '05',
        title: 'ಸಿದ್ಧವಾದ ಮೃತ್ಪಾತ್ರೆ',
        subtitle: 'ತಂಪಾದ ನೀರು ಮತ್ತು ದಿನಬಳಕೆಗೆ ಸಿದ್ಧವಾದ ಕಲಾಕೃತಿ',
        description:
          'ಆವಿಗೆ ತಣ್ಣಗಾದ ಮೇಲೆ ಬೆರಳಿನಿಂದ ತಟ್ಟಿದಾಗ ಗಂಟೆಯ ನಾದ ಬಂದರೆ ಮಡಕೆ ಚೆನ್ನಾಗಿ ಬೆಂದಿದೆ ಎಂದು ತಿಳಿಯಲಾಗುತ್ತದೆ.',
        techniqueNote:
          'ಪ್ರತಿಯೊಂದು ಮಣ್ಣಿನ ಮಡಕೆಯೂ ನೈಸರ್ಗಿಕವಾಗಿದ್ದು, ಅದರ ಬಳಕೆಯ ನಂತರ ಮತ್ತೆ ಮಣ್ಣಿನಲ್ಲೇ ಲೀನವಾಗುತ್ತದೆ.',
        image: {
          src: SITE_IMAGES.potteryMaking.stage5.src,
          alt: SITE_IMAGES.potteryMaking.stage5.alt,
          aspectRatio: SITE_IMAGES.potteryMaking.stage5.aspectRatio,
          caption: SITE_IMAGES.potteryMaking.stage5.caption,
          credit: SITE_IMAGES.potteryMaking.stage5.credit,
          requiredFilename: SITE_IMAGES.potteryMaking.stage5.requiredFilename,
        },
        iconName: 'Sparkles',
      },
    ],
  },

  sections: [
    {
      id: 'before-pottery',
      number: '02',
      title: 'ಮಡಕೆಗಳ ಮುಂಚಿನ ಕಾಲ',
      subtitle: 'ಪೂರ್ವ-ಮೃತ್ಪಾತ್ರ ನವಶಿಲಾಯುಗ (ಕ್ರಿ.ಪೂ. 7000 ಕ್ಕಿಂತ ಮೊದಲು) • ಪೂರ್ವಜರ ಜಲ ಸಂಗ್ರಹ',
      description:
        'ಮಣ್ಣನ್ನು ಬೆಂಕಿಯಲ್ಲಿ ಬೇಯಿಸುವುದನ್ನು ಕಲಿಯುವ ಮುನ್ನ, ಮಾನವರು ಒಣಗಿದ ಸೋರೆಕಾಯಿ ಬುರುಡೆಗಳು, ಮೆದು ಕಲ್ಲಿನ ಬಟ್ಟಲುಗಳು ಮತ್ತು ಚರ್ಮದ ಚೀಲಗಳನ್ನು ಬಳಸುತ್ತಿದ್ದರು.',
      fascinatingFact:
        'ಮೆಹರ್‌ಗಢ್‌ನಲ್ಲಿ ಜನರು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳ ಒಳಗೆ ನೈಸರ್ಗಿಕ ಡಾಂಬರು ಲೇಪಿಸಿ ನೀರನ್ನು ಸಂಗ್ರಹಿಸುತ್ತಿದ್ದರು!',
      highlights: ['ಒಣಗಿದ ಸೋರೆಕಾಯಿ ಬುರುಡೆ', 'ಡಾಂಬರು ಲೇಪಿತ ಬುಟ್ಟಿಗಳು', 'ಕಲ್ಲಿನ ಬಟ್ಟಲುಗಳು', 'ಚರ್ಮದ ಜಲಚೀಲಗಳು'],
      upcomingNote: 'ನೈಸರ್ಗಿಕ ಪಾತ್ರೆಗಳ ವಿವರಣೆ',
    },
    {
      id: 'origins',
      number: '03',
      title: 'ಭಾರತದಲ್ಲಿ ಮಡಕೆ ಕಲೆಯ ಉಗಮ',
      subtitle: 'ನವಶಿಲಾಯುಗದ ಕ್ರಾಂತಿ • ಬೆಂಕಿಯ ಶಾಖದಿಂದ ಗಟ್ಟಿಯಾದ ಮಣ್ಣು',
      description:
        'ಸಿಂಧು ಮತ್ತು ಗಂಗಾ ಬಯಲುಗಳಲ್ಲಿ ಕೃಷಿ ಆರಂಭವಾದಾಗ ಮಡಕೆ ಕಲೆ ಬೆಳೆಯಿತು. ಒಲೆಯ ಬೆಂಕಿಯಲ್ಲಿ ಮಣ್ಣು ಕಲ್ಲಿನಂತೆ ಗಟ್ಟಿಯಾಗುವುದನ್ನು ಕಂಡು ಮಡಕೆಗಳನ್ನು ಮಾಡತೊಡಗಿದರು.',
      fascinatingFact:
        '700°C–900°C ತಾಪದಲ್ಲಿ ಬೆಂದ ಮಣ್ಣಿನ ಮಡಕೆ ಹತ್ತು ಸಾವಿರ ವರ್ಷ ನೀರಿನಲ್ಲಿ ಬಿದ್ದಿದ್ದರೂ ಕರಗಿ ಮಣ್ಣಾಗುವುದಿಲ್ಲ!',
      highlights: ['ಒಲೆಯ ಬೆಂಕಿಯ ಶೋಧ', 'ಮೆಹರ್‌ಗಢ್ & ಲಹುರಾದೇವ', 'ಹಗ್ಗದ ಗುರುತಿನ ಮಡಕೆಗಳು', 'ಅಡುಗೆ ಕ್ರಾಂತಿ'],
      upcomingNote: 'ಪ್ರಾಚೀನ ತಾಣಗಳ ಕಾಲಾನುಕ್ರಮ',
    },
    {
      id: 'ancient-india',
      number: '04',
      title: 'ಪ್ರಾಚೀನ ಭಾರತದ ಮೃತ್ಪಾತ್ರೆಗಳು',
      subtitle: 'ಹರಪ್ಪಾದ ಚಕ್ರ ಕಲೆಯಿಂಂದ ಮೌರ್ಯರ ಹೊಳೆಯುವ ಕಪ್ಪು ಪಾತ್ರೆಗಳವರೆಗೆ',
      description:
        'ಸಿಂಧೂ ನಾಗರಿಕತೆಯ ಕೆಂಪು-ಕಪ್ಪು ಚಿತ್ರಕಲೆಯ ಮಡಕೆಗಳು, ವೈದಿಕ ಕಾಲದ ಬೂದು ಪಾತ್ರೆಗಳು (PGW), ಮತ್ತು ಮೌರ್ಯರ ಕಾಲದ ಕನ್ನಡಿಯಂತೆ ಹೊಳೆಯುವ ಕಪ್ಪು ಪಾತ್ರೆಗಳು (NBPW) ಭಾರತದ ಹೆಮ್ಮೆಯಾಗಿದ್ದವು.',
      fascinatingFact:
        'ಮೌರ್ಯರ ಕಾಲದಲ್ಲಿ NBPW ಪಾತ್ರೆಗಳು ಒಡೆದರೆ ತಾಮ್ರದ ತಂತಿಯಿಂದ ಹೊಲಿದು ಬಳಸುವಷ್ಟು ಅಮೂಲ್ಯವಾಗಿದ್ದವು!',
      highlights: ['ಹರಪ್ಪಾ ಕೆಂಪು-ಕಪ್ಪು ಪಾತ್ರೆ', 'ಬೂದು ಬಣ್ಣದ ಪಾತ್ರೆಗಳು (PGW)', 'ಹೊಳೆಯುವ ಕಪ್ಪು ಪಾತ್ರೆಗಳು (NBPW)', 'ಪುರಾತತ್ವ ಆಧಾರಗಳು'],
      upcomingNote: 'ಐತಿಹಾಸಿಕ ಪಾತ್ರೆಗಳ ಚಿತ್ರಣ',
    },
    {
      id: 'objects',
      number: '05',
      title: 'ದಿನನಿತ್ಯದ ಮಡಕೆಗಳು',
      subtitle: 'ತಂಪು ಮಾಡುವ ವೈಜ್ಞಾನಿಕ ತತ್ವ ಮತ್ತು ಅಚ್ಚುಕಟ್ಟಾದ ವಿನ್ಯಾಸ',
      description:
        'ಮಣ್ಣಿನ ಮಡಕೆಯು ಬಾಷ್ಪೀಕರಣದ ಮೂಲಕ ನೀರನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ತಂಪಾಗಿಸುತ್ತದೆ. ಕೂಜಾ ನೀರನ್ನು ಶುದ್ಧವಾಗಿಡುತ್ತದೆ; ಹಾಂಡಿ ಅಡುಗೆಯನ್ನು ರುಚಿಕರವಾಗಿ ಬೇಯಿಸುತ್ತದೆ.',
      fascinatingFact:
        'ಮಣ್ಣಿನ ಮಡಕೆಯು ಕೋಣೆಯ ಉಷ್ಣಾಂಶಕ್ಕಿಂತ 4°C ನಿಂದ 8°C ವರೆಗೆ ನೀರನ್ನು ಸ್ವಾಭಾವಿಕವಾಗಿ ತಂಪು ಮಾಡುತ್ತದೆ!',
      highlights: ['ತಣ್ಣನೆಯ ಮಣ್ಣಿನ ಮಡಕೆ', 'ಉದ್ದ ಕುತ್ತಿಗೆಯ ಕೂಜಾ', 'ಅಡುಗೆ ಹಾಂಡಿ', 'ಮಣ್ಣಿನ ಹಣತೆಗಳು & ಕುಲ್ಹಡ್'],
      upcomingNote: 'ವೈಜ್ಞಾನಿಕ ತತ್ವಗಳ ವಿವರಣೆ',
    },
    {
      id: 'making',
      number: '06',
      title: 'ಮಣ್ಣಿನ ಮಡಕೆ ಮಾಡುವ ವಿಧಾನ',
      subtitle: 'ಮಣ್ಣು, ನೀರು, ಕೈ ಮತ್ತು ಬೆಂಕಿ: ಐದು ಪವಿತ್ರ ಹಂತಗಳು',
      description:
        'ಮೆಕ್ಕಲು ಮಣ್ಣು ಸಂಗ್ರಹ, ಹದಗೊಳಿಸುವಿಕೆ, ಚಕ್ರದಲ್ಲಿ ರೂಪಿಸುವಿಕೆ, ಮರದ ಹಲಗೆಯಿಂದ ಬಡಿಯುವಿಕೆ ಮತ್ತು ಆವಿಗೆಯಲ್ಲಿ ಬೇಯಿಸುವಿಕೆ ಮುಖ್ಯ ಹಂತಗಳಾಗಿವೆ.',
      fascinatingFact:
        'ಒಳಗೆ ಕಲ್ಲು ಹಿಡಿದು ಹೊರಗೆ ಮರದ ಹಲಗೆಯಿಂದ ಬಡಿಯುತ್ತಾ ಮಡಕೆಗೆ ದುಂಡಗಿನ ಹೊಟ್ಟೆಯಾಕಾರ ನೀಡಲಾಗುತ್ತದೆ!',
      highlights: ['ಮಣ್ಣಿನ ಆಯ್ಕೆ', 'ಕುಂಬಾರರ ಚಕ್ರ', 'ಬಡಿಯುವ ಹಲಗೆ ಮತ್ತು ಕಲ್ಲು', 'ಆವಿಗೆಯಲ್ಲಿ ಬೇಯಿಸುವುದು'],
      upcomingNote: 'ಹಂತ-ಹಂತದ ವಿಧಾನ',
    },
    {
      id: 'everyday-life',
      number: '07',
      title: 'ದೈನಂದಿನ ಜೀವನ ಮತ್ತು ಹಬ್ಬಗಳು',
      subtitle: 'ಬೇಸಿಗೆಯ ತಂಪಿನಿಂದ ದೀಪಾವಳಿಯ ಹಣತೆಯವರೆಗೆ',
      description:
        'ಮಣ್ಣಿನ ಮಡಕೆ ನೀರು, ದೀಪಾವಳಿಯ ಕೋಟ್ಯಂತರ ಹಣತೆಗಳು ಮತ್ತು ಕುಲ್ಹಡ್ ಮಣ್ಣಿನ ಲೋಟದ ಚಹಾ ಭಾರತೀಯರ ಸಂಸ್ಕೃತಿಯೊಂದಿಗೆ ಹಾಸುಹೊಕ್ಕಾಗಿವೆ.',
      fascinatingFact:
        'ಕುಲ್ಹಡ್ ಜಗತ್ತಿನ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ತ್ಯಾಜ್ಯ-ರಹಿತ ಪಾತ್ರೆ: ಮಳೆ ಬಿದ್ದಾಗ ಅದು ಪುನಃ ಮಣ್ಣಿನಲ್ಲೇ ಕರಗಿಹೋಗುತ್ತದೆ!',
      highlights: ['ಮಡಕೆಯ ತಣ್ಣೀರು', 'ದೀಪಾವಳಿಯ ಮಣ್ಣಿನ ಹಣತೆ', 'ಮಣ್ಣಿನ ಪಾತ್ರೆಯ ಅಡುಗೆ', 'ಪರಿಸರ ಸ್ನೇಹಿ ಕುಲ್ಹಡ್'],
      upcomingNote: 'ಹಬ್ಬಗಳ ಪರಂಪರೆ ಕಥೆಗಳು',
    },
    {
      id: 'living-traditions',
      number: '08',
      title: 'ಕುಂಬಾರ ಕುಶಲಕರ್ಮಿಗಳು — ಜೀವಂತ ಪರಂಪರೆ',
      subtitle: 'ತಲೆಮಾರುಗಳಿಂದ ಹರಿದುಬಂದ ಪವಿತ್ರ ಜ್ಞಾನ',
      description:
        'ಕುಂಬಾರ, ಪ್ರಜಾಪತಿ ಸಮುದಾಯಗಳ ಕಲಾವಿದರ ಶ್ರಮವೇ ಈ ಪರಂಪರೆಗೆ ಜೀವ ತುಂಬಿದೆ. ಮಣ್ಣು, ಹವೆ ಮತ್ತು ಆವಿಗೆಯ ಉಷ್ಣತೆಯನ್ನು ಇವರು ಅದ್ಭುತವಾಗಿ ಅರಿಯಬಲ್ಲರು.',
      fascinatingFact:
        'ಬೆರಳಿನ ಸ್ಪರ್ಶದಿಂದಲೇ ಮಣ್ಣಿನ ಗುಣವನ್ನು ಮತ್ತು ಆವಿಗೆಯ ಹೊಗೆಯಿಂದಲೇ 850°C ತಾಪವನ್ನು ಕುಂಬಾರರು ನಿಖರವಾಗಿ ಗ್ರಹಿಸುತ್ತಾರೆ!',
      highlights: ['ಕುಂಬಾರ ಸಮುದಾಯ', 'ತಲೆಮಾರುಗಳ ಜ್ಞಾನ', 'ಕುಟುಂಬದ ಕಲಾಶಾಲೆ', 'ಸಾಂಪ್ರದಾಯಿಕ ಉಪಕರಣಗಳು'],
      upcomingNote: 'ಕಲಾವಿದರ ಜೀವನಾನುಭವ',
    },
    {
      id: 'today-tomorrow',
      number: '09',
      title: 'ಇಂದಿನ ಮತ್ತು ಮುಂದಿನ ಮಣ್ಣಿನ ಕಲೆ',
      subtitle: 'ವಿದ್ಯುತ್ ರಹಿತ ತಂಪು ವ್ಯವಸ್ಥೆ ಮತ್ತು ಸುಸ್ಥಿರ ಭವಿಷ್ಯ',
      description:
        'ಟೆರಾಕೋಟಾ ಕೊಳವೆಗಳ ಮೂಲಕ ಯಾವುದೇ ವಿದ್ಯುತ್ ಬಳಸದೆ ದೊಡ್ಡ ಕಟ್ಟಡಗಳನ್ನು ತಂಪಾಗಿಡುವ ಪರಿಸರಸ್ನೇಹಿ ತಂತ್ರಜ್ಞಾನ ಇಂದು ಜನಪ್ರಿಯವಾಗುತ್ತಿದೆ.',
      fascinatingFact:
        'ಸಾವಿರಾರು ಟೆರಾಕೋಟಾ ಕೊಳವೆಗಳ ಮೇಲೆ ನೀರು ಹರಿಸಿ ಕಟ್ಟಡಗಳನ್ನು 10°C ವರೆಗೆ ತಂಪು ಮಾಡಬಹುದು — ಇದು ನಮ್ಮ ಮಡಕೆಯ ತತ್ವವೇ!',
      highlights: ['ಟೆರಾಕೋಟಾ ಕೂಲರ್‌ಗಳು', 'ಆಧುನಿಕ ಸ್ಟುಡಿಯೋ ಪಾಟರಿ', 'ಜಿ.ಐ. ಟ್ಯಾಗ್ ಗೌರವ', 'ಸುಸ್ಥಿರ ಭವಿಷ್ಯ'],
      upcomingNote: 'ಆಧುನಿಕ ನಾವೀನ್ಯತೆಗಳು',
    },
  ],

  footer: {
    about:
      'ಮಣ್ಣಿನ ಕಥೆ ಮತ್ತು ಚಕ್ರ ತಿರುಗಿಸುವ ಕುಂಬಾರರ ಗೌರವಾರ್ಥವಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾದ ಶೈಕ್ಷಣಿಕ ಯೋಜನೆ.',
    sectionsTitle: 'ಅಧ್ಯಾಯಗಳು',
    creditsTitle: 'ಆಧಾರಗಳು',
    creditsText:
      'ಭಾರತೀಯ ಪುರಾತತ್ವ ಇಲಾಖೆ (ASI) ಮತ್ತು ಅಧ್ಯಯನಗಳ ಆಧಾರದ ಮೇಲೆ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.',
    copyright: '© 2026 ದಿ ಇಂಡಿಯನ್ ಪಾಟರಿ. ಶೈಕ್ಷಣಿಕ ಯೋಜನೆ.',
    backToTop: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
  },
};
