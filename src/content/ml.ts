import type { SiteContent } from '../types';
import { SITE_IMAGES } from '../data/images';

export const mlContent: SiteContent = {
  brandName: 'ദി ഇന്ത്യൻ പോട്ടറി',
  tagline: 'കാലത്തിന്റെ കുത്തൊഴുക്കിൽ രൂപപ്പെട്ട ഇന്ത്യൻ മൺപാത്ര കലാവൈഭവം.',
  menuLabel: 'അധ്യായങ്ങൾ',
  sectionsNavLabel: 'ചരിത്ര അധ്യായങ്ങൾ',

  navItems: [
    { id: 'home', label: 'ആമുഖം', shortLabel: 'ഹോം', href: '#home', number: '01' },
    { id: 'before-pottery', label: 'മൺപാത്രങ്ങൾക്ക് മുമ്പ്', shortLabel: 'പ്രാചീനകാലം', href: '#before-pottery', number: '02' },
    { id: 'origins', label: 'മൺപാത്ര നിർമ്മാണത്തിന്റെ തുടക്കം', shortLabel: 'തുടക്കം', href: '#origins', number: '03' },
    { id: 'ancient-india', label: 'പുരാതന ഭാരതം', shortLabel: 'പുരാതനം', href: '#ancient-india', number: '04' },
    { id: 'objects', label: 'നിത്യജീവിത പാത്രങ്ങൾ', shortLabel: 'പാത്രങ്ങൾ', href: '#objects', number: '05' },
    { id: 'making', label: 'നിർമ്മാണ രീതി', shortLabel: 'നിർമ്മാണം', href: '#making', number: '06' },
    { id: 'everyday-life', label: 'ജീവിതവും ഉത്സവങ്ങളും', shortLabel: 'ജീവിതം', href: '#everyday-life', number: '07' },
    { id: 'living-traditions', label: 'കുശവ സമൂഹങ്ങൾ', shortLabel: 'കലാകാരന്മാർ', href: '#living-traditions', number: '08' },
    { id: 'today-tomorrow', label: 'ഇന്നത്തെയും നാളത്തെയും മൺപാത്രങ്ങൾ', shortLabel: 'ഇന്നും നാളെയും', href: '#today-tomorrow', number: '09' },
  ],

  hero: {
    tagline: 'കാലത്തിന്റെ കുത്തൊഴുക്കിൽ രൂപപ്പെട്ട ഇന്ത്യൻ മൺപാത്ര കലാവൈഭവം.',
    badge: 'പതിനായിരം വർഷത്തെ സജീവ പാരമ്പര്യം',
    headline: 'നദീതടങ്ങളിലെ മണ്ണിൽ നിന്ന് ജീവനുള്ള കലയിലേക്ക്',
    headlineAccent: 'ഭാരതീയ മൺപാത്രങ്ങളുടെ ജീവിതഗാഥ',
    intro:
      'ലോഹങ്ങളോ പ്ലാസ്റ്റിക്കോ ഉണ്ടാകുന്നതിന് എത്രയോ മുമ്പ്, സാധാരണ മണ്ണിൽ കൈകൊണ്ട് രൂപം നൽകി തീച്ചൂളയിൽ ചുട്ടെടുത്താൽ ശുദ്ധജലവും സ്വാദിഷ്ടമായ ഭക്ഷണവും പാകം ചെയ്യാൻ കഴിയുമെന്ന് മനുഷ്യൻ തിരിച്ചറിഞ്ഞു.',
    primaryBtn: 'ചരിത്രം അറിയുക',
    secondaryBtn: 'നിർമ്മാണ രീതി കാണുക',
    stats: [
      { label: 'മൺപാത്ര ചരിത്രം', value: '10,000+ വർഷങ്ങൾ' },
      { label: 'പ്രകൃതി ഘടകങ്ങൾ', value: 'മണ്ണ്, ജലം & അഗ്നി' },
      { label: 'കുശവ കുടുംബങ്ങൾ', value: 'സജീവ പൈതൃകം' },
    ],
    showcaseCard: {
      title: 'കൈകൊണ്ട് നിർമ്മിച്ച ടെറാക്കോട്ട പാത്രം',
      description:
        'നദീതടങ്ങളിലെ മണ്ണിൽ ചക്രത്തിൽ രൂപം നൽകി ചൂളയിൽ ചുട്ടെടുത്ത അത്ഭുത പാത്രം.',
      badge: 'ടെറാക്കോട്ട പാത്രം',
      craftDetails: 'സ്വാഭാവിക നദീ മണ്ണ് • ചൂളയിൽ ചുട്ടത്',
    },
  },

  potteryMaking: {
    sectionTitle: 'മൺപാത്രം നിർമ്മിക്കുന്ന വിധം',
    introText:
      'മൃദുവായ മണ്ണിൽ നിന്നാണ് മൺപാത്രം ഉണ്ടാകുന്നത്. ക്ഷമയും വൈദഗ്ധ്യവും തീച്ചൂളയിലെ ചൂടും അതിനെ അമൂല്യമായ പാത്രമാക്കി മാറ്റുന്നു.',
    techniqueNotice:
      'കുറിപ്പ്: ഓരോ പ്രദേശത്തെയും മണ്ണിന്റെ സവിശേഷത അനുസരിച്ച് നിർമ്മാണ രീതികളിൽ വ്യത്യാസമുണ്ടാകും.',
    stages: [
      {
        id: 1,
        number: '01',
        title: 'മണ്ണ് തയ്യാറാക്കൽ',
        subtitle: 'മണ്ണെടുക്കലും ശുദ്ധീകരണവും കുഴയ്ക്കലും',
        description:
          'നദീതടങ്ങളിൽ നിന്നും കുളങ്ങളുടെ അടിത്തട്ടിൽ നിന്നും നല്ല എക്കൽമണ്ണ് ശേഖരിക്കുന്നു. കല്ലും പുല്ലും നീക്കം ചെയ്ത് ഉമിയും മണലും ചേർത്ത് കാലുകൊണ്ടും കൈകൊണ്ടും നന്നായി കുഴച്ചെടുക്കുന്നു.',
        techniqueNote:
          'വിരൽത്തുമ്പുകൊണ്ട് തൊട്ടുനോക്കി മണ്ണിന്റെ അയവും പശയും തിരിച്ചറിയാൻ കുശവന്മാർക്ക് പ്രത്യേക കഴിവുണ്ട്.',
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
        title: 'ചക്രത്തിൽ രൂപം നൽകൽ',
        subtitle: 'കറങ്ങുന്ന ചക്രവും തട്ടിപ്പരത്തലും',
        description:
          'ചക്രത്തിന് നടുവിൽ മണ്ണുവെച്ച് വേഗത്തിൽ കറക്കി വിരലുകൾ കൊണ്ട് രൂപം നൽകുന്നു. വലിയ കലങ്ങൾ ഉള്ളിൽ കല്ലുവെച്ച് പുറത്ത് തടി പലകകൊണ്ട് തട്ടി ഉരുട്ടിയെടുക്കുന്നു.',
        techniqueNote:
          'ചെറിയ കപ്പുകൾ ചക്രത്തിൽ തന്നെ തീർക്കുന്നു; വലിയ കലങ്ങൾ തട്ടിപ്പരത്തി വലുതാക്കുന്നു.',
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
        title: 'പാത്രങ്ങൾ ഉണക്കൽ',
        subtitle: 'തണലിലും ഇളംവെയിലിലും ഉണക്കിയെടുക്കൽ',
        description:
          'പച്ചമൺപാത്രങ്ങളിൽ ഈർപ്പം കൂടുതലായിരിക്കും. ആദ്യം തണലിലും പിന്നീട് രാവിലെത്തെ ഇളംവെയിലിലും സാവധാനം ഉണക്കുന്നു.',
        techniqueNote:
          'ഉണങ്ങുന്നത് ഒരുപോലെയല്ലെങ്കിൽ പാത്രങ്ങളിൽ വിള്ളൽ വീഴും.',
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
        title: 'ചൂളയിൽ ചുട്ടെടുക്കൽ',
        subtitle: 'അഗ്നിയിൽ വെന്ത് കല്ലുപോലെ ഉറയ്ക്കുന്നു',
        description:
          'നൂറുകണക്കിന് പാത്രങ്ങൾ ചൂളയിൽ അടുക്കിവെച്ച് വൈക്കോലും ഉമിയും വിറകും മൂടി 700°C-ൽ അധികം ചൂടിൽ ചുട്ടെടുക്കുന്നു.',
        techniqueNote:
          'വായു കടത്തിവിട്ടാൽ പാത്രങ്ങൾക്ക് ചുവപ്പ് നിറവും, പുകയടച്ചു വെച്ചാൽ കറുപ്പ് നിറവും ലഭിക്കുന്നു!',
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
        title: 'പൂർത്തിയായ മൺപാത്രം',
        subtitle: 'തണുത്ത വെള്ളത്തിനും പാചകത്തിനും തയ്യാർ',
        description:
          'ചൂള തണുത്ത ശേഷം വിരൽകൊണ്ട് തട്ടുമ്പോൾ മണിനാദം പോലുള്ള ശുദ്ധമായ ശബ്ദം കേൾക്കാം. അത് പാത്രം നന്നായി ചുട്ടെടുക്കപ്പെട്ടു എന്നതിന്റെ ലക്ഷണമാണ്.',
        techniqueNote:
          'ഓരോ മൺപാത്രവും പൂർണ്ണമായും പ്രകൃതിദത്തമാണ്. കാലാവധി തീരുമ്പോൾ വീണ്ടും മണ്ണിലേക്ക് തന്നെ ലയിച്ചുചേരുന്നു.',
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
      title: 'മൺപാത്രങ്ങൾക്ക് മുമ്പ്',
      subtitle: 'പുതിയ ശിലായുഗം (ബി.സി. 7000-ന് മുമ്പ്) • പൂർവ്വികരുടെ ജല സംഭരണം',
      description:
        'മൺപാത്രങ്ങൾ ഉണ്ടാക്കുന്നതിന് മുമ്പ്, ഉണങ്ങിയ ചുരയ്ക്ക തോടുകൾ, മൃദുവായ കല്ലിൽ കൊത്തിയ പാത്രങ്ങൾ, തുകൽ സഞ്ചികൾ എന്നിവയാണ് പൂർവ്വികർ ഉപയോഗിച്ചിരുന്നത്.',
      fascinatingFact:
        'മെഹർഗഢിൽ ജനങ്ങൾ പുല്ലുകൊട്ടകളിൽ പ്രകൃതിദത്ത ബിറ്റുമിൻ പൂശി വെള്ളം ശേഖരിച്ചിരുന്നു!',
      highlights: ['ഉണങ്ങിയ ചുരയ്ക്ക', 'ബിറ്റുമിൻ കൊട്ടകൾ', 'കൽപ്പത്രങ്ങൾ', 'തുകൽ സഞ്ചികൾ'],
      upcomingNote: 'പ്രകൃതിദത്ത പാത്രങ്ങളുടെ വിവരണം',
    },
    {
      id: 'origins',
      number: '03',
      title: 'ഭാരതത്തിലെ മൺപാത്ര തുടക്കം',
      subtitle: 'ശിലായുഗ വിപ്ലവം • തീച്ചൂളയിലെ മാജിക്',
      description:
        'സിന്ധു-ഗംഗാ നദീതടങ്ങളിൽ കൃഷി ആരംഭിച്ചതോടെയാണ് മൺപാത്ര നിർമ്മാണം തുടങ്ങിയത്. അടുപ്പിലെ തീയിൽ മണ്ണ് കല്ലുപോലെ ഉറയ്ക്കുന്നത് കണ്ട് മനുഷ്യൻ ഇത് തുടങ്ങി.',
      fascinatingFact:
        '700°C–900°C ചൂടിൽ ചുട്ടെടുത്ത മൺപാത്രം പതിനായിരം വർഷം വെള്ളത്തിൽ കിടന്നാലും വീണ്ടും ചെളിയായി മാറില്ല!',
      highlights: ['അടുപ്പിലെ കണ്ടെത്തൽ', 'മെഹർഗഢ് & ലഹുരാദേവ', 'വടം പതിഞ്ഞ പാത്രങ്ങൾ', 'പാചക വിപ്ലവം'],
      upcomingNote: 'പ്രാചീന കേന്ദ്രങ്ങളുടെ ചരിത്രം',
    },
    {
      id: 'ancient-india',
      number: '04',
      title: 'പുരാതന ഇന്ത്യയിലെ മൺപാത്രങ്ങൾ',
      subtitle: 'ഹാരപ്പൻ ചക്രകല മുതൽ മൗര്യൻ തിളങ്ങുന്ന പാത്രങ്ങൾ വരെ',
      description:
        'സിന്ധുനദീതട സംസ്കാരത്തിലെ അലങ്കരിച്ച ചുവപ്പ് പാത്രങ്ങളും, വേദിക് കാലഘട്ടത്തിലെ ചാരനിറ പാത്രങ്ങളും (PGW), മൗര്യ കാലത്തെ തിളങ്ങുന്ന കറുത്ത പാത്രങ്ങളും (NBPW) ഭാരതത്തിന്റെ അഭിമാനമായിരുന്നു.',
      fascinatingFact:
        'മൗര്യ കാലത്ത് NBPW പാത്രങ്ങൾ പൊട്ടിയാൽ ചെമ്പ് കമ്പികൊണ്ട് തുന്നി ഉപയോഗിക്കുമായിരുന്നു!',
      highlights: ['ഹാരപ്പൻ ചിത്രകല', 'ചാരനിറ പാത്രങ്ങൾ (PGW)', 'തിളങ്ങുന്ന കറുത്ത പാത്രങ്ങൾ (NBPW)', 'പുരാവസ്തു തെളിവുകൾ'],
      upcomingNote: 'ചരിത്ര പാത്രങ്ങളുടെ കാഴ്ചകൾ',
    },
    {
      id: 'objects',
      number: '05',
      title: 'നിത്യജീവിതത്തിലെ പാത്രങ്ങൾ',
      subtitle: 'തണുപ്പിക്കുന്ന ശാസ്ത്രവും മനോഹര രൂപവും',
      description:
        'മൺകലങ്ങൾ ബാഷ്പീകരണത്തിലൂടെ വെള്ളം സ്വാഭാവികമായി തണുപ്പിക്കുന്നു. കൂജ വെള്ളം വൃത്തിയായി സൂക്ഷിക്കുന്നു; ചട്ടി കറികൾക്ക് പ്രത്യേക രുചി നൽകുന്നു.',
      fascinatingFact:
        'മൺകലത്തിലെ വെള്ളം മുറിയിലെ താപനിലയേക്കാൾ 4°C മുതൽ 8°C വരെ പ്രകൃതിദത്തമായി തണുക്കുന്നു!',
      highlights: ['തണുത്ത വെള്ളത്തിന്റെ കലം', 'നീണ്ട കഴുത്തുള്ള കൂജ', 'മൺചട്ടി പാചകം', 'മൺചിരാതുകൾ & കുൽഹഡ്'],
      upcomingNote: 'ശാസ്ത്രീയ തത്വങ്ങളുടെ വിവരണം',
    },
    {
      id: 'making',
      number: '06',
      title: 'മൺപാത്രം നിർമ്മിക്കുന്ന വിധം',
      subtitle: 'മണ്ണ്, ജലം, കരം, അഗ്നി: അഞ്ച് പവിത്ര ഘട്ടങ്ങൾ',
      description:
        'മണ്ണെടുക്കൽ, കുഴയ്ക്കൽ, ചക്രത്തിൽ രൂപം നൽകൽ, തട്ടിപ്പരത്തൽ, ചൂളയിൽ ചുട്ടെടുക്കൽ എന്നിവയാണ് അഞ്ച് പ്രധാന ഘട്ടങ്ങൾ.',
      fascinatingFact:
        'ഉള്ളിൽ കല്ലുവെച്ച് പുറത്ത് തടി പലകകൊണ്ട് തട്ടിയാണ് കുശവന്മാർ മൺകലങ്ങൾക്ക് വട്ടരൂപം നൽകുന്നത്!',
      highlights: ['മണ്ണെടുക്കൽ', 'കുശവ ചക്രം', 'തട്ടിപ്പരത്തൽ', 'ചൂളയിൽ ചുട്ടെടുക്കൽ'],
      upcomingNote: 'ഘട്ടംഘട്ടമായുള്ള നിർമ്മാണം',
    },
    {
      id: 'everyday-life',
      number: '07',
      title: 'ജീവിതവും ഉത്സവങ്ങളും',
      subtitle: 'വേനലിലെ ദാഹശമനം മുതൽ ദീപാവലി ചിരാതുകൾ വരെ',
      description:
        'മൺകലത്തിലെ ജലം, ദീപാവലി-കാർത്തിക ദീപങ്ങളിലെ മൺചിരാതുകൾ, കുൽഹഡിലെ സുഗന്ധമുള്ള ചായ എന്നിവ ഭാരതീയ ജീവിതത്തിന്റെ ഭാഗമാണ്.',
      fascinatingFact:
        'മൺ കുൽഹഡ് ലോകത്തിലെ ഏറ്റവും പഴയ സീറോ-വേസ്റ്റ് കപ്പാണ്: മഴ പെയ്യുമ്പോൾ അത് വീണ്ടും മണ്ണായി മാറും!',
      highlights: ['തണുത്ത കലംവെള്ളം', 'ദീപാവലി മൺചിരാതുകൾ', 'മൺചട്ടി പാചകം', 'കുൽഹഡ് ചായ'],
      upcomingNote: 'ഉത്സവ പാരമ്പര്യങ്ങളുടെ കഥകൾ',
    },
    {
      id: 'living-traditions',
      number: '08',
      title: 'കുശവ സമൂഹങ്ങൾ — സജീവ പൈതൃകം',
      subtitle: 'തലമുറകളിലൂടെ കൈമാറിവന്ന പവിത്ര ജ്ഞാനം',
      description:
        'കുശവൻ, കുംഭാരൻ, പ്രജാപതി എന്ന് അറിയപ്പെടുന്ന കലാകാരന്മാരുടെ കഠിനാധ്വാനമാണ് ഈ കലയെ ഇന്നും നിലനിർത്തുന്നത്.',
      fascinatingFact:
        'വിരൽകൊണ്ട് തൊട്ടുനോക്കി മണ്ണിന്റെ ഗുണവും, ചൂളയിലെ പുക നോക്കി 850°C ചൂടും തിരിച്ചറിയാൻ ഇവർക്ക് കഴിയും!',
      highlights: ['കുശവ പാരമ്പര്യം', 'തലമുറകളുടെ അറിവ്', 'കുടുംബ ശിൽപശാലകൾ', 'പരമ്പരാഗത ഉപകരണങ്ങൾ'],
      upcomingNote: 'കലാകാരന്മാരുടെ ജീവിതാനുഭവങ്ങൾ',
    },
    {
      id: 'today-tomorrow',
      number: '09',
      title: 'ഇന്നത്തെയും നാളത്തെയും മൺപാത്രങ്ങൾ',
      subtitle: 'വൈദ്യുതിയില്ലാത്ത കൂളിംഗ് സംവിധാനങ്ങളും സുസ്ഥിര ഭാവിയും',
      description:
        'ടെറാക്കോട്ട ട്യൂബുകൾ ഉപയോഗിച്ച് വൈദ്യുതിയില്ലാതെ വലിയ കെട്ടിടങ്ങൾ തണുപ്പിക്കുന്ന രീതി ഇന്ന് വികസിച്ചുവരുന്നു.',
      fascinatingFact:
        'ആയിരക്കണക്കിന് ടെറാക്കോട്ട ട്യൂബുകളിൽ വെള്ളമൊഴിച്ച് കെട്ടിടങ്ങളെ 10°C വരെ തണുപ്പിക്കാൻ കഴിയും!',
      highlights: ['ടെറാക്കോട്ട കൂളറുകൾ', 'ആധുനിക സ്റ്റുഡിയോ പോട്ടറി', 'ജി.ഐ. ടാഗുകൾ', 'സുസ്ഥിര ഭാവി'],
      upcomingNote: 'പുതിയ കണ്ടുപിടുത്തങ്ങൾ',
    },
  ],

  footer: {
    about:
      'മൺപാത്ര കലയുടെ ചരിത്രവും കുശവ സമൂഹങ്ങളുടെ വൈദഗ്ധ്യവും പരിചയപ്പെടുത്തുന്ന വിദ്യാഭ്യാസ സംരംഭം.',
    sectionsTitle: 'അധ്യായങ്ങൾ',
    creditsTitle: 'കടപ്പാട്',
    creditsText:
      'ആർക്കിയോളജിക്കൽ സർവേ ഓഫ് ഇന്ത്യ (ASI) പര്യവേക്ഷണങ്ങളെ അടിസ്ഥാനമാക്കി തയ്യാറാക്കിയത്.',
    copyright: '© 2026 ദി ഇന്ത്യൻ പോട്ടറി. വിദ്യാഭ്യാസ സംരംഭം.',
    backToTop: 'മുകളിലേക്ക് പോവുക',
  },
};
