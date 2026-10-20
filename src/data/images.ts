/**
 * Centralized Image Configuration for The Indian Pottery
 * 
 * Directory Structure:
 * - public/images/hero/             -> Hero showcase & homepage visuals
 * - public/images/history/          -> Archaeological finds, sherds, ancient sites
 * - public/images/objects/          -> Traditional vessels (matka, surahi, handi, diya)
 * - public/images/pottery-making/   -> Step-by-step making photographs (clay prep, wheel, paddle, firing)
 * - public/images/living-traditions/-> Artisan portraits, workshops, living community traditions
 */

export interface ImageAsset {
  src: string;
  alt: string;
  aspectRatio: string;
  caption?: string;
  credit?: string;
  requiredFilename?: string;
}

export const SITE_IMAGES = {
  hero: {
    mainPottery: {
      src: '/images/hero/hero-pottery.jpg',
      alt: 'Handcrafted Indian terracotta pot with traditional etched patterns on a warm sandstone pedestal',
      aspectRatio: '4/3',
      caption: 'Traditional wheel-thrown terracotta pot with natural earthen slip and hand-etched chevron bands',
      credit: 'Curatorial Photograph',
      requiredFilename: 'hero-pottery.jpg',
    },
  },
  potteryMaking: {
    stage1: {
      src: '/images/pottery-making/01-preparing-clay.jpg',
      alt: 'Potter sifting and washing wet clay through a woven basket sieve with water into earthen tubs',
      aspectRatio: '16/10',
      caption: 'Washing and sifting alluvial clay through a woven basket sieve to remove pebbles and grit',
      credit: 'The Indian Pottery Workshop Archive',
      requiredFilename: '01-preparing-clay.jpg',
    },
    stage2: {
      src: '/images/pottery-making/02-shaping-pot.jpg',
      alt: 'Master potter shaping a large vessel on the spinning wooden wheel inside a rustic thatched studio',
      aspectRatio: '16/10',
      caption: 'Throwing and expanding the wet clay cylinder on the heavy flywheel with steady hands',
      credit: 'The Indian Pottery Workshop Archive',
      requiredFilename: '02-shaping-pot.jpg',
    },
    stage3: {
      src: '/images/pottery-making/03-drying-pot.jpg',
      alt: 'Rows of hundreds of earthen pots drying under the open sun in an Indian village courtyard',
      aspectRatio: '16/10',
      caption: 'Slow open-air sun drying across the field to evaporate moisture evenly before firing',
      credit: 'The Indian Pottery Workshop Archive',
      requiredFilename: '03-drying-pot.jpg',
    },
    stage4: {
      src: '/images/pottery-making/04-firing-clay.jpg',
      alt: 'Traditional open-pit aawa clamp kiln burning with wood and straw husks as a potter tends the fire',
      aspectRatio: '16/10',
      caption: 'Stacking vessels in the open aawa clamp kiln, firing above 800°C with glowing embers and smoke',
      credit: 'The Indian Pottery Workshop Archive',
      requiredFilename: '04-firing-clay.jpg',
    },
    stage5: {
      src: '/images/pottery-making/05-finished-pot.jpg',
      alt: 'Gleaming rows of finished red terracotta vessels cooling in the courtyard, tested with a clear ceramic ring',
      aspectRatio: '16/10',
      caption: 'Finished red terracotta pots tested for bell-like ring clarity, ready for cooling water and cooking',
      credit: 'The Indian Pottery Workshop Archive',
      requiredFilename: '05-finished-pot.jpg',
    },
  },
  history: {},
  objects: {},
  livingTraditions: {},
} as const;
