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
  { name: 'Pickleweed',           type: 'native',   image: assetImg('PICKLEWEED.png'),           note: "Pickleweed is a \"halophyte\" (a plant that thrives in salty conditions), it forms dense, succulent mats that stay green even when other vegetation dies back." },
  { name: 'California Poppy',     type: 'native',   image: assetImg('CALIFORNIA_POPPY.png'),     note: 'The California poppy serves as a critical early-season food source for native pollinators, particularly bumblebees and solitary bees.' },
  { name: 'Western Marsh Rosemary', type: 'native', image: assetImg('MARSH_ROSEMARY.png'),       note: 'Western Marsh Rosemary provides a vital nectar source for butterflies and native bees when many other marsh plants have finished blooming from mid-summer through late fall.' },
  { name: 'Marsh Gumplant',       type: 'native',   image: assetImg('MARSH_GUMPLANT.png'),       note: 'Marsh Gumplant often grows along the banks of tidal sloughs. Its root system helps hold the "shoulders" of these channels together, slowing down erosion from the daily ebb and flow of the tides.' },
  { name: 'California Sagebrush', type: 'native',   image: assetImg('CALIFORNIA_SAGEBRUSH.png'), note: "California Sagebrush is semi-evergreen and has a dense, feathery structure, it provides essential cover for small birds, lizards, and mammals from both the summer heat and winter rains." },
  { name: 'Saltgrass',            type: 'native',   image: assetImg('SALT_GRASS.png'),           note: 'Saltgrass spreads via underground runners (rhizomes). This creates a dense, interlocking "fabric" beneath the mud that is incredibly effective at preventing soil erosion against tidal surges and heavy runoff.' },
  { name: 'Alkali Heath',         type: 'native',   image: assetImg('ALKALI_HEATH.png'),         note: 'Alkali Heath keeps the mud cooler and moister during the hot summer months, supporting the spiders, beetles, and invertebrates that form the base of the marsh food web.' },
  { name: 'Common Yarrow',        type: 'native',   image: assetImg('COMMON_YARROW.png'),        note: 'Common Yarrow is a magnet for hoverflies, lacewings, and parasitic wasps. These insects are the primary predators of aphids and other garden pests.' },
  { name: 'Salty Susan',          type: 'native',   image: assetImg('SALTY_SUSAN.png'),          note: 'Salty Susan grows via creeping underground stems (rhizomes). This allows it to form dense, succulent mats that act like living rebar, reinforcing the muddy banks of tidal sloughs' },
  { name: 'Tule Reed',            type: 'native',   image: assetImg('TULE_REED.png'),            note: 'Tule Reed is the primary nesting site for Marsh Wrens. The sturdy, air-filled stems provide a stable structure for nests that can rise and fall slightly with water levels.' },

  // ----- INVASIVES (swipe LEFT to PULL) -----
  { name: 'Perennial Pepperweed', type: 'invasive', image: assetImg('PERENNIAL_PEPPERWEED.png'), note: "A piece of root as small as half an inch can sprout into a brand-new plant." },
  { name: 'Slender Iceplant',     type: 'invasive', image: assetImg('SLENDER_ICEPLANT.png'),     note: 'Slender iceplant is an invasive species that pulls massive amounts of salt from the soil into its succulent leaves.\n\nWhen the plant dies back in the summer, it releases all that concentrated salt directly onto the soil surface.' },
  { name: 'Yellow Starthistle',   type: 'invasive', image: assetImg('YELLOW_STARTHISTLE.png'),   note: 'It has a massive taproot that can reach more than 3 feet deep, allowing it to tap into groundwater reserves much faster and more deeply than most native grasses or flowers.' },
  { name: 'Fennel',               type: 'invasive', image: assetImg('FENNEL.png'),               note: 'It releases chemicals from its roots and fallen leaves into the soil that actively inhibit the growth of other plants.' },
  { name: 'Pampas Grass',         type: 'invasive', image: assetImg('PAMPAS_GRASS.png'),         note: 'It creates a "wall" of grass that prevents sunlight from reaching the low-growing Pickleweed or Saltgrass beneath it, eventually killing them off and leaving the ground bare and unproductive for local wildlife.' },
  { name: 'Mustard',              type: 'invasive', image: assetImg('MUSTARD.png'),              note: "It grows massive amounts of biomass in the spring, but by June or July, it dies completely and becomes a field of dry, brittle \"kindling\"." },
  { name: 'Russian Thistle',      type: 'invasive', image: assetImg('RUSSIAN_THISTLE.png'),      note: "A single tumbleweed can carry up to 250,000 seeds. As it rolls across the upland transition zones and into the marsh, it \"broadcasts\" these seeds over miles of habitat." },
  { name: 'Poison Hemlock',       type: 'invasive', image: assetImg('POISON_HEMLOCK.png'),       note: 'Hemlock stalks are hollow and brittle. They don\'t provide the long-term nesting stability that marsh birds require.' },
  { name: 'Stinkwort',            type: 'invasive', image: assetImg('STINKWORT.png'),            note: 'Most native insects and animals won\'t touch it. This gives stinkwort a massive advantage, as it faces zero grazing pressure while it smothers out the native plants that are being eaten.' },
  { name: 'Wild Radish',          type: 'invasive', image: assetImg('WILD_RADISH.png'),          note: 'Wild radish is one of the first plants to germinate after the winter rains. Because it grows so rapidly, it creates a dense "canopy" of large, bristly leaves that shade out the ground.' },
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
