# 🌱 Plant or Pull — SFBBO

A fast, mobile-first swipe game that teaches participants to identify **native vs. invasive** plants in San Francisco Bay tidal marsh habitats.

Built for [SFBBO](https://www.sfbbo.org/) outreach. Lightweight, addictive, and easy to iterate on.

## 🎮 How to play

- ⏱ You have **45 seconds**.
- ➡️ **Swipe right** (or tap 🌱) to **PLANT** a **native** species.
- ⬅️ **Swipe left** (or tap 🗑) to **PULL** an **invasive** species.
- ✅ Correct = +1 point (combo bonus up to +5 for streaks)
- ❌ Wrong = −1 point and **−2 seconds**
- 🔥 Build streaks for max score. High score is saved locally.

Vibration feedback fires on supported devices.

## 🛠 Tech

- React 18 + Vite
- Framer Motion (drag, exit animations, swipe stamps, FX)
- lucide-react icons
- CSS only — fully responsive, safe-area aware

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open the printed URL on a phone (same Wi-Fi) for the real experience.

After the first successful load, the app caches the shell and assets so it can be played offline.

## 📦 Build

```bash
npm run build
npm run preview
```

## 🌿 Adding / removing plants

Edit [src/plants.js](src/plants.js). Each entry is:

```js
{ name, type: 'native' | 'invasive', emoji, image?, note }
```

Add or remove items from the `PLANTS` array — the deck rebuilds automatically. No other file needs to change.

## 📷 Custom plant images

Drop a `.jpg` / `.png` / `.webp` into [public/plants/](public/plants/) (square ~800px works well), then point a plant at it:

```js
{ name: 'Pickleweed', type: 'native', emoji: '🥒', image: '/plants/pickleweed.jpg', note: '...' }
```

If the image fails to load, the card automatically falls back to the emoji. See [public/plants/README.md](public/plants/README.md) for the full guide.

## 🧪 Tests

Unit tests cover the plant catalogue, deck/shuffle helpers, image-path resolution, and all scoring rules (combo bonuses, time penalties, accuracy).

```bash
npm test         # watch mode
npm run test:ci  # single run (used in CI)
```

## 🚢 Deploy to GitHub Pages

A workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and publishes `dist/` to GitHub Pages on every push to `main`.

One-time setup:

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. Push to `main` — the site goes live at `https://<user>.github.io/<repo>/`.

The workflow injects `BASE_PATH=/<repo-name>/` automatically so asset paths work under the repo subpath. To deploy under a custom domain, set `BASE_PATH=/` (e.g. via a workflow override) and add a `CNAME` file to `public/`.

## 🐦 About SFBBO

Plant identification is a real skill used by [San Francisco Bay Bird Observatory](https://www.sfbbo.org/) volunteers restoring South Bay marshes. Tap the logo in the app — or visit [sfbbo.org](https://www.sfbbo.org/) — to learn how to support the work.

