# Custom plant images

Drop optional `.jpg` / `.png` / `.webp` images here to override the emoji on a card.

## How it works

In [`src/plants.js`](../src/plants.js), every plant entry can include an `image` field:

```js
{
  name: 'Pickleweed',
  type: 'native',
  emoji: '🥒',
  image: '/plants/pickleweed.jpg', // <-- optional
  note: '...'
}
```

If `image` is set and the file loads, it replaces the emoji on the card. If it
fails to load (e.g. wrong filename), the card automatically falls back to the
emoji — so you can ship the game without any photos and add them gradually.

## Recommended files

- Format: **JPG or WebP** (smaller) for photos; PNG only if you need transparency.
- Size: **square**, ~800×800px is plenty.
- Path: anything under this folder is served at `/<repo-base>/plants/<file>`.
  Just reference it as `/plants/<file>` in `src/plants.js`; Vite handles the
  base path automatically.

## Adding a new plant in 30 seconds

1. Drop `myplant.jpg` into this folder.
2. Open [`src/plants.js`](../src/plants.js).
3. Add a new object to the `PLANTS` array:
   ```js
   { name: 'My Plant', type: 'native', emoji: '🌱', image: '/plants/myplant.jpg', note: 'Why it matters' },
   ```
4. Done — it's already in the deck.
