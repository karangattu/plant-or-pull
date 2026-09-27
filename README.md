# Plant or Pull

Swipe game for identifying native and invasive marsh plants.

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm run test:ci
```

## Build

```bash
npm run build
```

## Android APK

Build a signed, offline APK for Android tablets:

```bash
npm run android:apk
```

Output: `android/app/build/outputs/apk/release/app-release.apk`
(copy at repo root as `plant-or-pull-<version>.apk`).

All web assets are bundled in the APK — no network needed to play.

## Deploy

GitHub Pages is configured in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
