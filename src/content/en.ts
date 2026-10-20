import type { SiteContent } from '../types';
import { SITE_IMAGES } from '../data/images';

export const enContent: SiteContent = {
  brandName: 'The Indian Pottery',
  tagline: 'The story of Indian pottery, shaped by time.',
  menuLabel: 'Chapters',
  sectionsNavLabel: 'Story Chapters',

  navItems: [
    { id: 'home', label: 'Home', shortLabel: 'Home', href: '#home', number: '01' },
    { id: 'before-pottery', label: 'Before Clay Pots', shortLabel: 'Before Clay', href: '#before-pottery', number: '02' },
    { id: 'origins', label: 'How Pottery Began', shortLabel: 'Origins', href: '#origins', number: '03' },
    { id: 'ancient-india', label: 'Ancient India', shortLabel: 'Ancient', href: '#ancient-india', number: '04' },
    { id: 'objects', label: 'Everyday Pots', shortLabel: 'Pots', href: '#objects', number: '05' },
    { id: 'making', label: 'How Pots Are Made', shortLabel: 'Making', href: '#making', number: '06' },
    { id: 'everyday-life', label: 'Clay in Daily Life', shortLabel: 'Daily Life', href: '#everyday-life', number: '07' },
    { id: 'living-traditions', label: 'The Potters', shortLabel: 'Potters', href: '#living-traditions', number: '08' },
    { id: 'today-tomorrow', label: 'Indian Pottery Today', shortLabel: 'Today', href: '#today-tomorrow', number: '09' },
  ],

  hero: {
    tagline: 'The story of Indian pottery, shaped by time.',
    badge: 'Ten Thousand Years of Living Craft',
    headline: 'From River Mud to Living Art',
    headlineAccent: 'The Story of Indian Pottery',
    intro:
      'Long before metal or plastic existed, people discovered that ordinary river clay, shaped by hand and baked in fire, could hold fresh water, cook food, and brighten homes. Explore how soft earth became one of India’s most enduring traditions, how potters work, and why clay still matters today.',
    primaryBtn: 'Explore the Story',
    secondaryBtn: 'See How Pots Are Made',
    stats: [
      { label: 'Story of Clay', value: '10,000+ Years' },
      { label: 'Essential Elements', value: 'Earth, Water & Fire' },
      { label: 'Artisan Families', value: 'Living Tradition' },
    ],
    showcaseCard: {
      title: 'Handcrafted Terracotta Pot',
      description:
        'Spun on a potter’s wheel from river silt, decorated with carved patterns, and baked strong in an earthen kiln.',
      badge: 'Terracotta Vessel',
      craftDetails: 'Natural River Silt • Fire Baked',
    },
  },

  potteryMaking: {
    sectionTitle: 'How a Clay Pot Is Made',
    introText:
      'A clay pot begins as soft earth. With skill, patience, and heat, it becomes something people can use every day.',
    techniqueNotice:
      'Note: Potters across India use different techniques depending on the local clay, the type of vessel, and regional traditions.',
    stages: [
      {
        id: 1,
        number: '01',
        title: 'Preparing the Clay',
        subtitle: 'Digging, cleaning, and kneading the earth',
        description:
          'Potters collect fine silt from riverbeds and dry pond bottoms. The raw earth is soaked in water, sifted to remove pebbles and roots, and mixed with fine sand or rice husk so it won’t crack. Then the potter kneads it thoroughly with hands and feet until it is smooth, soft, and ready for the wheel.',
        techniqueNote:
          'Different soils need different amounts of water and sand. A skilled potter knows the perfect texture simply by feeling the clay with their fingertips.',
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
        title: 'Shaping the Pot',
        subtitle: 'The spinning wheel and the wooden paddle',
        description:
          'The potter centers a lump of clay on the wheel and spins it fast. Using gentle, steady pressure, thumbs open the center and fingers draw the walls upward. In many Indian traditions, large round pots are then expanded by gently tapping the outside with a wooden paddle (thapa) while holding a stone anvil (pindi) inside.',
        techniqueNote:
          'Methods vary across regions: small cups and lids are shaped entirely on the wheel, while large water pots are finished with paddle and anvil. Some communities also shape pots by hand using clay coils or molds.',
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
        title: 'Drying the Pot',
        subtitle: 'Patience in the shade and sun',
        description:
          'Freshly shaped pots contain a lot of water. If heated too quickly, trapped steam will cause them to burst. Potters dry the pots slowly in the shade so they shrink evenly, before moving them to gentle morning sunlight. Before firing, some pots are polished with a smooth river stone or painted with natural red mineral slip.',
        techniqueNote:
          'Drying must be slow and even. If one side dries faster than the other, the pot can warp or crack.',
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
        title: 'Firing the Clay',
        subtitle: 'The magic of flame and heat',
        description:
          'Drying makes a pot stiff, but only fire makes it permanent. Potters carefully stack hundreds of dried pots in an open bonfire kiln called an aawa, packing layers of dry grass, cow dung cakes, and rice husk around them. The kiln is lit and burns for hours, reaching temperatures over 700°C.',
        techniqueNote:
          'When plenty of air enters the kiln, the clay turns rich terracotta red. If the potter seals the kiln with damp mud so it smokes without oxygen, the pots emerge jet black!',
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
        title: 'The Finished Pot',
        subtitle: 'Ready for cooling, cooking, and daily life',
        description:
          'Once the kiln cools slowly overnight, the potter unloads the vessels. Each pot is gently tapped with a finger — if it rings with a clear, bell-like chime, it was fired properly and is ready to use. These pots will cool drinking water during hot summers, simmer curries, hold festival lamps, or serve hot tea.',
        techniqueNote:
          'Every finished pot is natural, porous, and free of synthetic chemicals. When its life ends, it dissolves harmlessly back into the earth.',
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
      title: 'Before Clay Pots',
      subtitle: 'Pre-Pottery Neolithic Era (Pre-7000 BCE) • How early ancestors stored water & grain',
      description:
        'Before people discovered that fire could permanently transform soft mud into waterproof pottery, ancient hunter-gatherers and early foragers across the Indian subcontinent relied on what nature provided. They dried and hollowed tough bottle gourds (kamandalu), carved soft soapstone (steatite) and sandstone bowls, stitched animal leather waterskins (mashaq) for nomadic treks, and wove reed baskets coated with natural mineral bitumen (asphalt) to hold liquids and protect wild grains.',
      fascinatingFact:
        'At Mehrgarh (c. 7000 BCE, Baluchistan), during the Aceramic (Pre-Pottery) Neolithic period, archaeologists discovered that before ancient communities invented ceramic firing, they waterproofed woven reed baskets by lining them with natural mineral bitumen (asphalt) to hold liquids and preserve harvested barley grains!',
      highlights: ['Hollowed Gourds (Kamandalu)', 'Bitumen-Sealed Baskets', 'Carved Steatite Bowls', 'Nomadic Waterskins'],
      upcomingNote: 'Interactive discovery of early natural containers',
    },
    {
      id: 'origins',
      number: '03',
      title: 'How Pottery Began in India',
      subtitle: 'The Neolithic Transition (c. 7000–5000 BCE) • How campfire heat turned mud to ceramic',
      description:
        'Pottery emerged as communities settled into farming along riverbanks like the Indus, Saraswati, and Ganga basins (Mehrgarh, Lahuradewa, and Koldihwa). Early people observed that damp river clay around campfire cooking pits baked rock-hard in the embers. Early artisans began shaping clay by hand and pressing wet clay coils inside woven grass baskets; when baked, the grass burned away, leaving behind the earliest cord-impressed pottery in ancient India.',
      fascinatingFact:
        'Firing causes irreversible vitrification: at 700°C–900°C, silica and alumina in river clay permanently fuse together at a molecular level. A fired earthen pot will never dissolve back into mud, even if buried under damp river silt for 10,000 years!',
      highlights: ['Hearth Discoveries', 'Mehrgarh & Lahuradewa', 'Cord-Impressed Ware', 'Cooking Revolution'],
      upcomingNote: 'Timeline of early subcontinent pottery sites',
    },
    {
      id: 'ancient-india',
      number: '04',
      title: 'Pots of Ancient India',
      subtitle: 'From Harappan urban wheelcraft to gleaming Mauryan mirror bowls',
      description:
        'In the planned bronze-age cities of the Indus Valley Civilization (2600–1900 BCE), potters used fast flywheels to produce standardized red ware painted with black slips: pipal leaves, peacocks, and intersecting circles. As centuries passed, Indian ceramic technology advanced through distinctive archaeological epochs: Ochre Coloured Pottery (OCP), Painted Grey Ware (PGW, 1200–600 BCE) of the Vedic period, and the legendary Northern Black Polished Ware (NBPW, 700–200 BCE) with its mirror-like metallic luster.',
      fascinatingFact:
        'Northern Black Polished Ware was so prized across the Mauryan Empire that when a precious bowl cracked, ancient owners did not discard it — they carefully repaired it with copper wire and rivets, treating it like valuable heirloom silver and gold jewelry!',
      highlights: ['Harappan Black-on-Red', 'Painted Grey Ware (PGW)', 'Northern Black Polished (NBPW)', 'Archaeological Clues'],
      upcomingNote: 'Visual explorer of major historical pottery eras',
    },
    {
      id: 'objects',
      number: '05',
      title: 'Pots We Use Every Day',
      subtitle: 'Ingenious thermal science and ergonomic shapes of traditional Indian vessels',
      description:
        'Every traditional Indian clay pot is a masterclass in thermal engineering and ergonomic form. The round-bellied matka naturally chills drinking water through microscopic clay pores via latent heat of evaporation. The long slender neck of the surahi restricts warm air currents and keeps water clean. The spherical bottom of the cooking handi distributes firewood heat evenly, ensuring curries simmer tenderly without hot-spot scorching.',
      fascinatingFact:
        'A clay matka cools water naturally by 4°C to 8°C below ambient room temperature through evaporative cooling: as micro-droplets seep through unglazed pores and evaporate into dry air, they draw away latent heat from the water held inside!',
      highlights: ['Water Matka Chiller', 'Slender Surahi Flask', 'Cooking Handi Pot', 'Clay Diyas & Kulhads'],
      upcomingNote: 'Interactive vessel anatomy and cooling physics demo',
    },
    {
      id: 'making',
      number: '06',
      title: 'How a Clay Pot Is Made',
      subtitle: 'Earth, water, hand, and flame: five timeless stages of traditional pottery',
      description:
        'The making of an authentic Indian clay vessel follows five timeless stages: gathering fine alluvial pond silt (chikni mitti), levigating and foot-kneading the clay, throwing on the heavy flywheel (chak), rhythmic expanding with wooden paddle (thapa) and stone anvil (pindi), and firing in an open clamp kiln (aawa).',
      fascinatingFact:
        'Unlike modern pottery which relies on molds, traditional Indian potters shape large pots partially on the wheel, then rhythmically tap the exterior with a wooden paddle (thapa) while holding a smooth stone anvil (pindi) inside, expanding the belly into a seamless, ultralight sphere!',
      highlights: ['Pond Silt Gathering', 'The Potter’s Wheel (Chak)', 'Paddle & Anvil Beating', 'Clamp Kiln Firing (Aawa)'],
      upcomingNote: 'Interactive Step-by-Step Making Explorer',
    },
    {
      id: 'everyday-life',
      number: '07',
      title: 'Clay in Everyday Life & Festivals',
      subtitle: 'From summer drinking water and street chai to sacred festival lights',
      description:
        'In Indian homes, earthenware connects daily life with nature and sacred traditions. Earthen pots keep summer drinking water naturally chilled, pure, and alkaline. Millions of tiny terracotta oil lamps (diyas) illuminate homes during Diwali, Karthika Deepam, and Dev Deepavali. And at railway stations and roadside stalls, fresh spiced chai is poured into disposable earthen cups (kulhads) that impart a rich petrichor mineral fragrance (saundhi khushboo).',
      fascinatingFact:
        'The unglazed clay kulhad is humanity’s oldest zero-waste cup: made purely of raw river silt without artificial glazes or chemicals, it dissolves completely back into the soil during the next monsoon rain without creating any plastic waste or microplastics!',
      highlights: ['Evaporative Matka Chilling', 'Festive Terracotta Diyas', 'Earthen Cooking (Handi)', 'Eco-friendly Kulhad Chai'],
      upcomingNote: 'Stories of pottery in households and festive traditions',
    },
    {
      id: 'living-traditions',
      number: '08',
      title: 'The People Who Make the Pots',
      subtitle: 'Generational wisdom of Kummara, Kumbhar, and artisan families',
      description:
        'The true heart of Indian pottery is the artisan families who have sustained this craft through generations. Known as Kummara or Kummari in Andhra Pradesh and Telangana, Kumbhar in Maharashtra and Gujarat, Prajapati in North India, and Kuyavar in Tamil Nadu, these master artisans possess intuitive understanding of soil plasticity, seasonal drying winds, and kiln combustion.',
      fascinatingFact:
        'Master potters can judge the plasticity and mineral readiness of clay simply by kneading it between two fingertips, and can tell when the interior of an Aawa clamp kiln has reached 850°C vitrification temperature purely by the color, sound, and smell of the smoke rising from the sealed husk layer!',
      highlights: ['Kummara & Kumbhar Communities', 'Generational Knowledge', 'Family Workshops', 'Artisan Tools (Thapa & Pindi)'],
      upcomingNote: 'Living traditions, artisan profiles, and community voices',
    },
    {
      id: 'today-tomorrow',
      number: '09',
      title: 'Indian Pottery Today',
      subtitle: 'Zero-energy climate architecture, contemporary ceramics, and artisan dignity',
      description:
        'Today, people are rediscovering that clay is one of the most sustainable materials on Earth. Indian architectural innovators are building zero-energy air-cooling facades using porous terracotta cones that drop indoor temperatures naturally. Modern ceramicists collaborate with village potters to create contemporary tableware, while GI (Geographical Indication) tags help protect heritage traditions like Nizamabad black pottery and Bankura terracotta horses.',
      fascinatingFact:
        'Modern architectural firms in India are building natural air-cooling installations made of thousands of terracotta tubes drenched in water, cooling large industrial and commercial buildings by up to 10°C using zero electricity, inspired by the evaporative physics of the village matka!',
      highlights: ['Zero-Energy Clay Coolers', 'Modern Studio Pottery', 'Artisan Livelihoods & GI Tags', 'Sustainable Future'],
      upcomingNote: 'Modern innovations and supporting local pottery',
    },
  ],

  footer: {
    about:
      'An educational project exploring the story of clay, traditional techniques, everyday pots, and the artisan families who keep the wheel turning.',
    sectionsTitle: 'Explore the Story',
    creditsTitle: 'Sources & Acknowledgements',
    creditsText:
      'Historical facts reference archaeological excavations from the Archaeological Survey of India, ancient sites including Mehrgarh and Harappa, and research on traditional potter communities including Kummara/Kummari artisans. Original photographs and community interviews are being prepared for upcoming stages.',
    copyright: '© 2026 The Indian Pottery. Educational project.',
    backToTop: 'Back to top',
  },
};
