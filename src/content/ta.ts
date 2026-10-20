import type { SiteContent } from '../types';
import { SITE_IMAGES } from '../data/images';

export const taContent: SiteContent = {
  brandName: 'தி இந்தியன் பாட்டரி',
  tagline: 'காலத்தின் வழியே உருவான இந்திய மட்பாண்டக் கலையின் பெருமை.',
  menuLabel: 'அத்தியாயங்கள்',
  sectionsNavLabel: 'வரலாற்று அத்தியாயங்கள்',

  navItems: [
    { id: 'home', label: 'முகப்பு', shortLabel: 'முகப்பு', href: '#home', number: '01' },
    { id: 'before-pottery', label: 'மண்பாண்டங்களுக்கு முன்', shortLabel: 'முன்-காலம்', href: '#before-pottery', number: '02' },
    { id: 'origins', label: 'மட்பாண்டத் தொடக்கம்', shortLabel: 'தொடக்கம்', href: '#origins', number: '03' },
    { id: 'ancient-india', label: 'பண்டைய இந்தியா', shortLabel: 'பண்டையது', href: '#ancient-india', number: '04' },
    { id: 'objects', label: 'அன்றாட பாண்டங்கள்', shortLabel: 'பாண்டங்கள்', href: '#objects', number: '05' },
    { id: 'making', label: 'செய்முறை விளக்கம்', shortLabel: 'செய்முறை', href: '#making', number: '06' },
    { id: 'everyday-life', label: 'வாழ்வும் விழாக்களும்', shortLabel: 'வாழ்வியல்', href: '#everyday-life', number: '07' },
    { id: 'living-traditions', label: 'மட்பாண்டக் கலைஞர்கள்', shortLabel: 'குயவர்கள்', href: '#living-traditions', number: '08' },
    { id: 'today-tomorrow', label: 'இன்றும் நாளையும்', shortLabel: 'இன்று-நாளை', href: '#today-tomorrow', number: '09' },
  ],

  hero: {
    tagline: 'காலத்தின் வழியே உருவான இந்திய மட்பாண்டக் கலையின் பெருமை.',
    badge: 'பத்தாயிரம் ஆண்டு வாழும் மரபு',
    headline: 'ஆற்று வண்டல் மண்ணிலிருந்து உருவான உயிருள்ள கலை',
    headlineAccent: 'இந்திய மண்பாண்டங்களின் வாழ்வியல் கதை',
    intro:
      'உலோகம் அல்லது நெகிழி உருவாவதற்குப் பல காலத்திற்கு முன்பே, ஆற்று வண்டல் மண்ணைக் கையால் வனந்து நெருப்பில் சுட்டால் அது குளிர்ந்த நீரைச் சேமிக்கவும், உணவைச் சமைக்கவும் பயன்படும் என்பதை மனிதன் கண்டறிந்தான்.',
    primaryBtn: 'வரலாற்றை அறிக',
    secondaryBtn: 'செய்முறையைக் காண்க',
    stats: [
      { label: 'மட்பாண்ட வரலாறு', value: '10,000+ ஆண்டுகள்' },
      { label: 'இயற்கை மூலங்கள்', value: 'மண், நீர் & நெருப்பு' },
      { label: 'குயவர் குடும்பங்கள்', value: 'வாழும் பாரம்பரியம்' },
    ],
    showcaseCard: {
      title: 'கைவண்ண டெரகோட்டா பாண்டம்',
      description:
        'ஆற்று வண்டல் மண்ணால் சக்கரத்தில் வனையப்பட்டு, சூளையில் சுடப்பட்டு உருவான கலைப் படைப்பு.',
      badge: 'டெரகோட்டா மண்பாண்டம்',
      craftDetails: 'இயற்கை வண்டல் மண் • சூளையில் சுடப்பட்டது',
    },
  },

  potteryMaking: {
    sectionTitle: 'மண்பாண்டம் செய்யும் முறை',
    introText:
      'மண்பாண்டம் மென்மையான களிமண்ணிலிருந்து தொடங்குகிறது. குயவரின் பொறுமையும் நெருப்பின் வெப்பமும் அதனை அன்றாடப் பயன்பாட்டுக்குரிய பாண்டமாக மாற்றுகிறது.',
    techniqueNotice:
      'குறிப்பு: உள்ளூர் மண் வளம் மற்றும் பாரம்பரிய முறைகளின் அடிப்படையில் இந்தியக் குயவர்கள் பல்வேறு நுட்பங்களைப் பயன்படுத்துகின்றனர்.',
    stages: [
      {
        id: 1,
        number: '01',
        title: 'மண்ணைத் தயார் செய்தல்',
        subtitle: 'மண் எடுத்தல், சலித்தல் மற்றும் பிசைதல்',
        description:
          'ஆற்றுப்படுகைகள் மற்றும் ஏரிப் படுகைகளிலிருந்து வண்டல் மண்ணைச் சேகரித்து, நீரில் ஊறவைத்து சலித்து, தவிடு மற்றும் மணல் கலந்து கால்களாலும் கைகளாலும் மிருதுவாகப் பிசைகிறார்கள்.',
        techniqueNote:
          'அனுபவம் வாய்ந்த குயவர் விரல்களால் தொட்டுப் பார்த்தே மண்ணின் பதத்தை துல்லியமாக அறிந்து கொள்வார்.',
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
        title: 'சக்கரத்தில் வனைதல்',
        subtitle: 'சுழலும் சக்கரமும் தட்டுப்பலகை அடிமுறையும்',
        description:
          'சக்கரத்தின் நடுவே களிமண்ணை வைத்து வேகமாகச் சுழற்றி விரல்களால் மேலே எழுப்புகிறார்கள். பெரிய பானைகளை விரிவுபடுத்த உள்ளே கல்லையும் வெளியே மரத் தட்டுப்பலகையையும் கொண்டு தட்டுகிறார்கள்.',
        techniqueNote:
          'சிறிய கோப்பைகள் சக்கரத்திலேயே முடிந்துவிடும்; பெரிய பானைகள் தட்டுப்பலகையால் விரிவுபடுத்தப்படுகின்றன.',
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
        title: 'பாண்டங்களை உலர்த்துதல்',
        subtitle: 'நிழலிலும் இளவெயிலிலும் பக்குவமாக உலர்த்துதல்',
        description:
          'ஈரப் பானைகளை நிழலில் மெதுவாக உலர்த்திப் பின்னர் காலை இளவெயிலில் வைக்கிறார்கள். உலர்த்தும் வேகம் சீராக இல்லாவிட்டால் விரிசல்கள் ஏற்படும்.',
        techniqueNote:
          'சுடுவதற்கு முன் ஆற்றுக்கல்லால் தேய்த்து மெருகேற்றுவர்.',
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
        title: 'மண் சூளையில் சுடுதல்',
        subtitle: 'நெருப்பில் வெந்து கல்லாக மாறும் தருணம்',
        description:
          'நூற்றுக்கணக்கான பானைகளை பாரம்பரியச் சூளையில் அடுக்கி, வைக்கோல், வறட்டி கொண்டு மூடி 700°C-க்கு மேல் சுடுகிறார்கள்.',
        techniqueNote:
          'சூளையில் காற்று புகுந்தால் சிவப்பு நிறமாகவும், காற்று புகாமல் மூடினால் கரிய நிறமாகவும் பாண்டங்கள் மாறும்!',
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
        title: 'முழுமைபெற்ற மண்பாண்டம்',
        subtitle: 'குளிர்ந்த நீருக்கும் சமையலுக்கும் தயார்',
        description:
          'சூளை குளிர்ந்ததும் விரலால் தட்டிப் பார்த்து மணி போன்ற நாதம் ஒலித்தால் பாண்டம் உறுதியானது என உறுதி செய்வர்.',
        techniqueNote:
          'மண்பாண்டம் இயற்கையானது; அதன் வாழ்நாள் முடிந்ததும் மீண்டும் மண்ணோடு மண்ணாகக் கலந்துவிடும்.',
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
      title: 'மண்பாண்டங்களுக்கு முன்',
      subtitle: 'புதிய கற்காலம் (கி.மு. 7000-க்கு முன்) • முன்னோர்களின் நீர் சேமிப்பு',
      description:
        'மண்ணைச் சுட்டு பாண்டம் செய்யத் தொடங்கும் முன், மனிதர்கள் சுரைக்காய் ஓடுகள், மென் கல் கிண்ணங்கள், தோல் பைகள் மற்றும் தார் பூசப்பட்ட புல் கூடைகளைப் பயன்படுத்தினர்.',
      fascinatingFact:
        'மெஹர்கரில் மக்கள் புல் கூடைகளுக்குள் இயற்கை தார் பூசி நீரைச் சேமித்தனர்!',
      highlights: ['சுரைக்காய் குடுக்கை', 'தார் பூசிய கூடைகள்', 'கற்கிண்ணங்கள்', 'தோல் பைகள்'],
      upcomingNote: 'இயற்கை கொள்கலன்களின் பார்வை',
    },
    {
      id: 'origins',
      number: '03',
      title: 'இந்தியாவில் மட்பாண்டத் தொடக்கம்',
      subtitle: 'புதிய கற்காலப் புரட்சி • நெருப்பால் கெட்டிப்பட்ட மண்',
      description:
        'சிந்து மற்றும் கங்கை நதிக்கரைகளில் வேளாண்மை தோன்றியபோது மண்பாண்டங்கள் உருவாயின. அடுப்பின் சூட்டில் மண் பாறையாக மாறுவதைக் கண்டு மனிதன் இதனைத் தொடங்கினான்.',
      fascinatingFact:
        '700°C–900°C வெப்பத்தில் சுடப்பட்ட மண் பத்தாயிரம் ஆண்டுகள் நீரில் கிடந்தாலும் மீண்டும் களிமண்ணாக மாறாது!',
      highlights: ['அடுப்பு நெருப்பின் கண்டுபிடிப்பு', 'மெஹர்கர் & லஹுராதேவா', 'கயிறு தடம் பதித்த பானை', 'சமையல் புரட்சி'],
      upcomingNote: 'பண்டைய தளங்களின் காலவரிசை',
    },
    {
      id: 'ancient-india',
      number: '04',
      title: 'பண்டைய இந்தியாவின் மண்பாண்டங்கள்',
      subtitle: 'ஹரப்பா சக்கரக் கலை முதல் மௌரியர் கால பளபளப்புக் கிண்ணங்கள் வரை',
      description:
        'சிந்துவெளி நாகரிகத்தில் அரச இலை, மயில் ஓவியங்களுடன் கூடிய சக்கரப் பானைகளும், வேத காலத்தில் சாம்பல் நிறப் பானைகளும் (PGW), மௌரியர் காலத்தில் உலோகம் போல் மின்னும் கறுப்புப் பாண்டங்களும் (NBPW) தோன்றின.',
      fascinatingFact:
        'மௌரியர் காலத்தில் NBPW பாண்டங்கள் உடைந்தால் செப்பு கம்பியால் தைத்துப் பயன்படுத்தும் அளவுக்குப் போற்றப்பட்டன!',
      highlights: ['ஹரப்பா சிவப்பு-கருப்பு பானை', 'சாம்பல் நிறப் பாண்டம் (PGW)', 'பளபளப்புக் கருப்புப் பாண்டம் (NBPW)', 'தொல்லியல் சான்றுகள்'],
      upcomingNote: 'வரலாற்று பாண்டங்களின் விளக்கம்',
    },
    {
      id: 'objects',
      number: '05',
      title: 'அன்றாட பயன்பாட்டு பாண்டங்கள்',
      subtitle: 'குளிர்விக்கும் அறிவியல் நுட்பமும் அழகிய வடிவமும்',
      description:
        'மண்பானை ஆவியாதல் மூலம் நீரை இயற்கையாகக் குளிர்விக்கிறது. கூஜா நீரைத் தூய்மையாக வைக்கிறது; சட்டி உணவைச் சீராகச் சமைக்கிறது.',
      fascinatingFact:
        'மண்பானை அறையின் வெப்பநிலையை விட நீரை 4°C முதல் 8°C வரை இயற்கையாகக் குளிர்விக்கிறது!',
      highlights: ['குளிர்விக்கும் மண்பானை', 'நீண்ட கழுத்து கூஜா', 'சமையல் சட்டி', 'மண் அகல் விளக்குகள்'],
      upcomingNote: 'குளிர்விப்பு அறிவியலின் செயல்முறை',
    },
    {
      id: 'making',
      number: '06',
      title: 'மண்பாண்டம் செய்யும் முறை',
      subtitle: 'மண், நீர், கரம், நெருப்பு: ஐந்து புனித நிலைகள்',
      description:
        'வண்டல் மண் சேகரிப்பு, பிசைதல், சக்கரத்தில் வனைதல், தட்டிப் பரப்புதல் மற்றும் சூளையில் சுடுதல் ஆகியவை பாரம்பரிய நிலைகளாகும்.',
      fascinatingFact:
        'இந்தியக் குயவர்கள் உள்ளே கல்லை வைத்து வெளியே மரப்பலகையால் தட்டி பானையை உருண்டையாக்குகிறார்கள்!',
      highlights: ['மண் சேகரிப்பு', 'குயவர் சக்கரம்', 'தட்டுப்பலகை அடி', 'சூளையில் சுடுதல்'],
      upcomingNote: 'செய்முறை வழிகாட்டி',
    },
    {
      id: 'everyday-life',
      number: '07',
      title: 'வாழ்வியலும் விழாக்களும்',
      subtitle: 'கோடை காலத் தாகம் முதல் திருக்கார்த்திகை விளக்கு வரை',
      description:
        'மண்பானை நீர், தீபாவளி, கார்த்திகை அகல் விளக்குகள் மற்றும் மண் குல்ஹட் தேநீர் ஆகியவை இந்தியப் பண்பாட்டோடு பின்னிப் பிணைந்துள்ளன.',
      fascinatingFact:
        'மண் குல்ஹட் கோப்பை மழையில் நனைந்ததும் மீண்டும் மண்ணாகவே மாறிவிடும், குப்பையே உருவாகாது!',
      highlights: ['மண்பானைத் தண்ணீர்', 'திருக்கார்த்திகை அகல் விளக்கு', 'மண் சட்டி சமையல்', 'சுவையான மண் குவளைத் தேநீர்'],
      upcomingNote: 'பாரம்பரிய வாழ்வியல் கதைகள்',
    },
    {
      id: 'living-traditions',
      number: '08',
      title: 'மட்பாண்டக் கலைஞர்கள் — வாழும் மரபு',
      subtitle: 'குயவர் சமூகங்களின் தலைமுறை அறிவு',
      description:
        'தமிழ்நாட்டில் குயவர் அல்லது வேளார் என்றும், ஆந்திராவில் கும்மரா என்றும், வட இந்தியாவில் பிரஜாபதி என்றும் அழைக்கப்படும் கலைஞர்களின் கைவண்ணமே இக்கலைக்கு உயிர் கொடுக்கிறது.',
      fascinatingFact:
        'மூத்த குயவர்கள் விரலால் தொட்டே மண்ணின் தரத்தையும், சூளையின் புகையை வைத்தே 850°C வெப்பத்தையும் உணர்ந்து கொள்வர்!',
      highlights: ['குயவர் குல மரபு', 'தலைமுறை ஞானம்', 'குடும்பக் கூடங்கள்', 'பாரம்பரியக் கருவிகள்'],
      upcomingNote: 'கலைஞர்களின் வாழ்வியல் குரல்',
    },
    {
      id: 'today-tomorrow',
      number: '09',
      title: 'இன்றும் நாளையும்',
      subtitle: 'மின்னணு இல்லாத கட்டடக் குளிர்விப்பு மற்றும் சூழலியல் மறுமலர்ச்சி',
      description:
        'இன்று சுடுமண் குழாய்களைப் பயன்படுத்தி மின்சாரமில்லாத கட்டடக் குளிர்விப்பு முறைகளை இந்தியப் பொறியாளர்கள் உருவாக்குகிறார்கள்.',
      fascinatingFact:
        'ஆயிரக்கணக்கான சுடுமண் குழாய்களில் நீர் பாய்ச்சி மின்சாரமின்றி பெரிய கட்டடங்களை 10°C வரை குளிர்விக்க முடிகிறது!',
      highlights: ['சுடுமண் குளிர்விப்பான்', 'நவீன கலைப் பாண்டங்கள்', 'புவிசார் குறியீடுகள்', 'நிலையான எதிர்காலம்'],
      upcomingNote: 'நவீனப் புதுமைகளும் கைவினை ஆதரவும்',
    },
  ],

  footer: {
    about:
      'மண்பாண்டக் கலை வரலாறு மற்றும் சக்கரம் சுழற்றும் குயவர் குடும்பங்களின் பெருமைக்குரிய கல்வித் தளம்.',
    sectionsTitle: 'அத்தியாயங்கள்',
    creditsTitle: 'ஆதாரங்கள்',
    creditsText:
      'இந்தியத் தொல்லியல் துறை (ASI) மற்றும் ஆய்வுகளின் அடிப்படையில் தொகுக்கப்பட்டது.',
    copyright: '© 2026 தி இந்தியன் பாட்டரி. கல்வித் திட்டம்.',
    backToTop: 'மேலே செல்ல',
  },
};
