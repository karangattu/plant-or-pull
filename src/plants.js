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
//     note:  'Behavior and life-cycle clue, without revealing the swipe category',
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
  { name: 'Pickleweed',           type: 'native',   image: assetImg('PICKLEWEED.png'),           note: 'A perennial succulent, pickleweed stores water in jointed stems and forms low mats across salty marsh soil.' },
  { name: 'California Poppy',     type: 'native',   image: assetImg('CALIFORNIA_POPPY.png'),     note: 'An annual or perennial herb, California poppy opens its orange flowers in sunlight and closes them at night or in cloudy weather.' },
  { name: 'Western Marsh Rosemary', type: 'native', image: assetImg('MARSH_ROSEMARY.png'),       note: 'A perennial herb, western marsh rosemary sends up airy sprays of tiny lavender flowers above a low leaf rosette.' },
  { name: 'Marsh Gumplant',       type: 'native',   image: assetImg('MARSH_GUMPLANT.png'),       note: 'A perennial herb, marsh gumplant bears sticky flower buds and yellow blooms along damp tidal slough banks.' },
  { name: 'California Sagebrush', type: 'native',   image: assetImg('CALIFORNIA_SAGEBRUSH.png'), note: 'A perennial shrub, California sagebrush keeps fine aromatic leaves through much of the year but sheds some during dry summers.' },
  { name: 'Saltgrass',            type: 'native',   image: assetImg('SALT_GRASS.png'),           note: 'A perennial grass, saltgrass sends horizontal rhizomes beneath the soil and sprouts new shoots to form dense patches.' },
  { name: 'Alkali Heath',         type: 'native',   image: assetImg('ALKALI_HEATH.png'),         note: 'A perennial low-growing herb, alkali heath spreads across salty ground with wiry stems and tiny pink flowers.' },
  { name: 'Common Yarrow',        type: 'native',   image: assetImg('COMMON_YARROW.png'),        note: 'A perennial herb, common yarrow spreads by rhizomes and bears flat clusters of tiny flowers visited by many insects.' },
  { name: 'Salty Susan',          type: 'native',   image: assetImg('SALTY_SUSAN.png'),          note: 'A perennial succulent herb, Salty Susan spreads through underground rhizomes and sends up yellow flowers above low marsh mats.' },
  { name: 'Tule Reed',            type: 'native',   image: assetImg('TULE_REED.png'),            note: 'A perennial sedge, tule reed sends up tall firm stems from underground rhizomes, forming dense stands in wet ground.' },
  { name: 'Western Goldenrod',    type: 'native',   image: assetImg('WESTERN_GOLDENROD.png'),    note: 'A perennial herb, western goldenrod grows upright each season and blooms in flat-topped clusters of small yellow flower heads.' },
  { name: 'Coyote Brush',         type: 'native',   image: assetImg('COYOTE_BRUSH.png'),         note: 'A perennial evergreen shrub, coyote brush branches densely and releases wind-carried seeds from fluffy white heads on female plants.' },
  { name: 'Pacific Cordgrass',    type: 'native',   image: assetImg('PACIFIC_CORDGRASS.png'),    note: 'A perennial grass, Pacific cordgrass spreads by rhizomes and raises tall stems that withstand regular tidal flooding.' },

  // ----- INVASIVES (swipe LEFT to PULL) -----
  { name: 'Perennial Pepperweed', type: 'invasive', image: assetImg('PERENNIAL_PEPPERWEED.png'), note: 'A perennial herb, perennial pepperweed regrows from deep creeping roots; even small root pieces can sprout new shoots.' },
  { name: 'Slender Iceplant',     type: 'invasive', image: assetImg('SLENDER_ICEPLANT.png'),     note: 'An annual succulent, slender iceplant stores salt in fleshy leaves and leaves it behind on the soil surface when the plant dries.' },
  { name: 'Yellow Starthistle',   type: 'invasive', image: assetImg('YELLOW_STARTHISTLE.png'),   note: 'An annual herb, yellow starthistle grows a deep taproot and sets spiny yellow flower heads before summer drying.' },
  { name: 'Fennel',               type: 'invasive', image: assetImg('FENNEL.png'),               note: 'A perennial herb, fennel resprouts from its crown and produces tall, feathery stems topped with yellow flower umbels.' },
  { name: 'Pampas Grass',         type: 'invasive', image: assetImg('PAMPAS_GRASS.png'),         note: 'A perennial grass, pampas grass forms a large tussock of sharp leaves and raises tall feathery seed plumes.' },
  { name: 'Mustard',              type: 'invasive', image: assetImg('MUSTARD.png'),              note: 'Usually an annual herb, mustard germinates after winter rains, flowers yellow in spring, then dries into upright stalks by summer.' },
  { name: 'Russian Thistle',      type: 'invasive', image: assetImg('RUSSIAN_THISTLE.png'),      note: 'An annual herb, Russian thistle dries into a round brittle plant that can break free and tumble, scattering seeds as it rolls.' },
  { name: 'Poison Hemlock',       type: 'invasive', image: assetImg('POISON_HEMLOCK.png'),       note: 'Usually a biennial herb, poison hemlock forms a leaf rosette in its first year, then sends up tall hollow flower stalks in its second.' },
  { name: 'Stinkwort',            type: 'invasive', image: assetImg('STINKWORT.png'),            note: 'An annual herb, stinkwort grows sticky, strongly scented foliage and small yellow flower heads late in the growing season.' },
  { name: 'Wild Radish',          type: 'invasive', image: assetImg('WILD_RADISH.png'),          note: 'An annual or biennial herb, wild radish sprouts after rain and grows quickly into a leafy rosette before sending up flower stalks.' },
  { name: 'Brass-Buttons',        type: 'invasive', image: assetImg('BRASS_BUTTONS.png'),        note: 'A perennial herb, brass-buttons roots at stem nodes as it creeps over wet ground and makes round yellow heads without petals.' },
  { name: 'Australian Saltbush',  type: 'invasive', image: assetImg('AUSTRALIAN_SALTBUSH.png'),  note: 'A perennial groundcover, Australian saltbush spreads in low branches with small gray-green leaves and tiny red diamond-shaped fruits.' },
  { name: 'Hottentot Fig',        type: 'invasive', image: assetImg('HOTTENTOT_FIG.png'),        note: 'A perennial succulent, Hottentot Fig spreads by trailing stems that can reroot from fragments and opens large yellow flowers.' },
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
export function resolveImage(image, baseUrl) {
  if (!image) return null
  if (/^(?:https?:)?\/\//i.test(image) || /^[a-z]+:/i.test(image)) return image
  const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}
  const base = (baseUrl ?? env.BASE_URL ?? '/').replace(/\/$/, '')
  const normalized = image.startsWith('/') ? image : `/${image}`

  if (!base || base === '/') return normalized
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized

  return `${base}${normalized}`
}
