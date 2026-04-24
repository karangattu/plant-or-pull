import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PLANTS, resolveImage } from './plants.js'
import './styles.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})

    // Warm the cache with every plant image so the game stays fully playable
    // offline after the first visit. The service worker will pick these up
    // through its network-first handler and store them in the runtime cache.
    const warm = () => {
      for (const plant of PLANTS) {
        const src = resolveImage(plant.image)
        if (!src) continue
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'eager'
        img.src = src
      }
    }
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(warm, { timeout: 4000 })
    } else {
      setTimeout(warm, 1500)
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
