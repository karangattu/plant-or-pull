// SFBBO tidal marsh plants — native vs invasive.
//
// 🌱 ADDING / REMOVING / EDITING PLANTS
// -------------------------------------
// Each entry is a plain object. Add or remove items from PLANTS and you're done
// — the deck is built from this array. No other file needs to change.
//
//   {
//     name:  'Display name shown on the card',
//     type:  'native' | 'invasive',  // determines the correct swipe direction
//     emoji: '🌱',                    // fallback icon when no image is set
//     image: assetImg('FILE.png'),   // OPTIONAL — drop the file into assets/
//     note:  'Short explanation shown under the card name',
//   }
//
// 📷 USING CUSTOM IMAGES
// ----------------------
// 1. Drop a .png / .jpg / .webp into  assets/  (square ~800px works well).
// 2. Set `image: assetImg('YOUR_FILE.png')` on the matching plant below.
// 3. If the image fails to load, the card automatically falls back to `emoji`.

// Plant images from assets/ — Vite bundles and fingerprints them at build time.
const _assets = import.meta.glob('../assets/*.png', { eager: true, query: '?url', import: 'default' })
const assetImg = (file) => _assets[`../assets/${file}`] ?? null

export const PLANTS = [
  // ----- NATIVES (swipe RIGHT to PLANT) -----
  { name: 'Pickleweed',           type: 'native',   image: assetImg('PICKLEWEED.png'),           note: "The 'superstar' of the salt marsh; provides cover for the Ridgway's Rail." },
  { name: 'California Poppy',     type: 'native',   image: assetImg('CALIFORNIA_POPPY.png'),     note: 'The state flower; essential for upland transition zones.' },
  { name: 'Western Marsh Rosemary', type: 'native', image: assetImg('MARSH_ROSEMARY.png'),       note: 'Beautiful purple flowers that support native bees and butterflies.' },
  { name: 'Marsh Gumplant',       type: 'native',   image: assetImg('MARSH_GUMPLANT.png'),       note: 'Sticky yellow flowers that provide high-tide refuge for marsh birds.' },
  { name: 'California Sagebrush', type: 'native',   image: assetImg('CALIFORNIA_SAGEBRUSH.png'), note: "'Cowboy Cologne'; vital for upland nesting birds." },
  { name: 'Saltgrass',            type: 'native',   image: assetImg('SALT_GRASS.png'),           note: 'A tough, salt-excreting grass that stabilizes the shoreline.' },
  { name: 'Alkali Heath',         type: 'native',   image: assetImg('ALKALI_HEATH.png'),         note: 'Forms dense mats that help prevent erosion in the high marsh.' },
  { name: 'Common Yarrow',        type: 'native',   image: assetImg('COMMON_YARROW.png'),        note: 'A fleshy plant that thrives in the salty, alkaline soils of the South Bay.' },
  { name: 'Salty Susan',          type: 'native',   image: assetImg('SALTY_SUSAN.png'),          note: 'A fleshy mat-forming succulent native to the high marsh of the South Bay.' },
  { name: 'Tule Reed',            type: 'native',   image: assetImg('TULE_REED.png'),            note: 'Tall bulrush that provides vital nesting cover for marsh birds and mammals.' },

  // ----- INVASIVES (swipe LEFT to PULL) -----
  { name: 'Perennial Pepperweed', type: 'invasive', image: assetImg('PERENNIAL_PEPPERWEED.png'), note: "Known as 'Tall Whitetop'; creates dense monocultures birds can't use." },
  { name: 'Slender Iceplant',     type: 'invasive', image: assetImg('SLENDER_ICEPLANT.png'),     note: 'Thick succulent leaves that change soil chemistry and crush everything else.' },
  { name: 'Yellow Starthistle',   type: 'invasive', image: assetImg('YELLOW_STARTHISTLE.png'),   note: 'Spiny, nasty, and drinks way more than its share of water.' },
  { name: 'Fennel',               type: 'invasive', image: assetImg('FENNEL.png'),               note: 'Smells like licorice, but takes over upland transition zones rapidly.' },
  { name: 'Pampas Grass',         type: 'invasive', image: assetImg('PAMPAS_GRASS.png'),         note: 'Giant fluffy plumes producing millions of seeds and razor-sharp leaves.' },
  { name: 'Mustard',              type: 'invasive', image: assetImg('MUSTARD.png'),              note: "Those 'pretty' yellow fields actually suffocate native wildflowers." },
  { name: 'Russian Thistle',      type: 'invasive', image: assetImg('RUSSIAN_THISTLE.png'),      note: "The classic 'tumbleweed'; not from here and spreads like wildfire." },
  { name: 'Poison Hemlock',       type: 'invasive', image: assetImg('POISON_HEMLOCK.png'),       note: 'Highly toxic to humans and livestock; recognisable by its purple-blotched stems.' },
  { name: 'Stinkwort',            type: 'invasive', image: assetImg('STINKWORT.png'),            note: 'Pungent daisy that spreads aggressively in disturbed upland and marsh edges.' },
  { name: 'Wild Radish',          type: 'invasive', image: assetImg('WILD_RADISH.png'),          note: 'Fast-growing escapee that out-competes native wildflowers in transition zones.' },
]

// Fisher-Yates shuffle returning a new array.
export function shuffle(array, rand = Math.random) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a long shuffled deck so the timer is the only limit.
export function buildDeck(rounds = 8, source = PLANTS, rand = Math.random) {
  let deck = []
  for (let i = 0; i < rounds; i++) deck = deck.concat(shuffle(source, rand))
  return deck
}

// Resolve an image path against Vite's BASE_URL so it works on GitHub Pages.
export function resolveImage(image) {
  if (!image) return null
  if (/^https?:\/\//i.test(image)) return image
  const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}
  const base = (env.BASE_URL || '/').replace(/\/$/, '')
  return base + (image.startsWith('/') ? image : `/${image}`)
}
