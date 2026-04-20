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
//     image: '/plants/file.jpg',     // OPTIONAL — drop the file in /public/plants/
//     note:  'Short explanation shown under the card name',
//   }
//
// 📷 USING CUSTOM IMAGES
// ----------------------
// 1. Drop a .jpg / .png / .webp into  public/plants/   (square ~800px works well).
// 2. Set `image: '/plants/your-file.jpg'` on the matching plant below.
// 3. If the image fails to load, the card automatically falls back to `emoji`.
//
// See public/plants/README.md for a full guide.

export const PLANTS = [
  // ----- NATIVES (swipe RIGHT to PLANT) -----
  { name: 'Pickleweed',           type: 'native',   emoji: '🥒',  note: "The 'superstar' of the salt marsh; provides cover for the Ridgway's Rail." },
  { name: 'Saltmarsh Dodder',     type: 'native',   emoji: '🍝',  note: 'A native parasitic vine that looks like orange spaghetti — actually good for the ecosystem!' },
  { name: 'California Poppy',     type: 'native',   emoji: '🌼',  note: 'The state flower; essential for upland transition zones.' },
  { name: 'Marsh Rosemary',       type: 'native',   emoji: '💜',  note: 'Beautiful purple flowers that support native bees and butterflies.' },
  { name: 'Marsh Gumplant',             type: 'native',   emoji: '🌻',  note: 'Sticky yellow flowers that provide high-tide refuge for marsh birds.' },
  { name: 'California Sagebrush', type: 'native',   emoji: '🌿',  note: "'Cowboy Cologne'; vital for upland nesting birds." },
  { name: 'Saltgrass',            type: 'native',   emoji: '🌾',  note: 'A tough, salt-excreting grass that stabilizes the shoreline.' },
  { name: 'Coyote Brush',         type: 'native',   emoji: '🪴',  note: 'The backbone of coastal scrub restoration; very hardy.' },
  { name: 'Alkali Heath',         type: 'native',   emoji: '🌱',  note: 'Forms dense mats that help prevent erosion in the high marsh.' },
  { name: 'Common Yarrow',             type: 'native',   emoji: '🌵',  note: 'A fleshy plant that thrives in the salty, alkaline soils of the South Bay.' },

  // ----- INVASIVES (swipe LEFT to PULL) -----
  { name: 'Perennial Pepperweed', type: 'invasive', emoji: '⚪',  note: "Known as 'Tall Whitetop'; creates dense monocultures birds can't use." },
  { name: 'Ice Plant',            type: 'invasive', emoji: '🧊',  note: 'Thick succulent leaves that change soil chemistry and crush everything else.' },
  { name: 'Yellow Starthistle',   type: 'invasive', emoji: '⭐',  note: 'Spiny, nasty, and drinks way more than its share of water.' },
  { name: 'Stinkwort',            type: 'invasive', emoji: '🤢',  note: 'A sticky, smelly weed; toxic to some livestock and crowds out natives.' },
  { name: 'French Broom',         type: 'invasive', emoji: '🧹',  note: "Looks like a pretty yellow bush, but it's a fire hazard and highly invasive." },
  { name: 'Fennel',               type: 'invasive', emoji: '🌿',  note: 'Smells like licorice, but takes over upland transition zones rapidly.' },
  { name: 'Pampas Grass',         type: 'invasive', emoji: '🪶',  note: 'Giant fluffy plumes producing millions of seeds and razor-sharp leaves.' },
  { name: 'Mustard',              type: 'invasive', emoji: '💛',  note: "Those 'pretty' yellow fields actually suffocate native wildflowers." },
  { name: 'Broadleaf Pepperweed', type: 'invasive', emoji: '🥬',  note: 'A salt-tolerant invader that mimics marsh plants but offers no habitat value.' },
  { name: 'Russian Thistle',      type: 'invasive', emoji: '🌪️', note: "The classic 'tumbleweed'; not from here and spreads like wildfire." },
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
