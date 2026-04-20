import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  Sprout,
  Trash2,
  Timer,
  Trophy,
  Flame,
  Play,
  RotateCcw,
  Leaf,
  Skull,
  ArrowLeft,
  ArrowRight,
  Vibrate,
  ExternalLink,
} from 'lucide-react'
import { buildDeck, resolveImage } from './plants'
import {
  ROUND_SECONDS,
  applySwipe,
  initialState,
  accuracyOf,
} from './game'

const SWIPE_THRESHOLD = 110 // px
const SFBBO_URL = 'https://www.sfbbo.org/'
const LOGO_URL = resolveImage('/sfbbo_logo.png')

function vibrate(pattern) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern) } catch {}
  }
}

// ---------- Plant artwork: image with emoji fallback ----------
function PlantArt({ plant }) {
  const src = resolveImage(plant.image)
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={plant.name}
        className="card-img"
        draggable={false}
        onError={() => setFailed(true)}
      />
    )
  }
  return <span className="card-emoji" aria-hidden>{plant.emoji}</span>
}

// ---------- Card ----------
function Card({ plant, onSwipe, isTop }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], [-18, 0, 18])
  const leftOpacity = useTransform(x, [-160, -40, 0], [1, 0.2, 0])
  const rightOpacity = useTransform(x, [0, 40, 160], [0, 0.2, 1])

  function handleDragEnd(_, info) {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -700) {
      onSwipe('pull')
    } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 700) {
      onSwipe('plant')
    }
  }

  return (
    <motion.div
      className="card"
      style={{ x, rotate, zIndex: isTop ? 3 : 2 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.9 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: 1 }}
      exit={{
        x: x.get() > 0 ? 600 : -600,
        rotate: x.get() > 0 ? 30 : -30,
        opacity: 0,
        transition: { duration: 0.28 },
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div className="stamp left" style={{ opacity: leftOpacity }}>
        <Trash2 size={18} /> Pull
      </motion.div>
      <motion.div className="stamp right" style={{ opacity: rightOpacity }}>
        <Sprout size={18} /> Plant
      </motion.div>

      <div className="card-art" aria-hidden>
        <PlantArt plant={plant} />
      </div>
      <div className="card-meta">
        <h2 className="card-name">
          {plant.name}
          <Leaf size={18} color="#16a34a" />
        </h2>
        <p className="card-hint">{plant.note}</p>
      </div>
    </motion.div>
  )
}

// ---------- Brand: SFBBO logo + link ----------
function Brand({ compact = false }) {
  return (
    <a
      className="brand"
      href={SFBBO_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Learn more about SFBBO"
    >
      <img className="brand-logo" src={LOGO_URL} alt="SFBBO logo" />
      {!compact && (
        <div>
          Plant or Pull
          <div className="brand-sub">SFBBO · Tidal Marsh</div>
        </div>
      )}
    </a>
  )
}

// ---------- App ----------
export default function App() {
  const [screen, setScreen] = useState('home') // home | play | over
  const [state, setState] = useState(() => initialState(buildDeck(8)))
  const [fx, setFx] = useState(null)
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0
    return Number(localStorage.getItem('pop_high') || 0)
  })

  const tickRef = useRef(null)

  // Timer
  useEffect(() => {
    if (screen !== 'play') return
    tickRef.current = setInterval(() => {
      setState((s) => {
        if (s.timeLeft <= 1) {
          clearInterval(tickRef.current)
          return { ...s, timeLeft: 0 }
        }
        return { ...s, timeLeft: s.timeLeft - 1 }
      })
    }, 1000)
    return () => clearInterval(tickRef.current)
  }, [screen])

  // End condition
  useEffect(() => {
    if (screen === 'play' && state.timeLeft === 0) {
      vibrate([30, 60, 30, 60, 120])
      setHighScore((h) => {
        const next = Math.max(h, state.score)
        try { localStorage.setItem('pop_high', String(next)) } catch {}
        return next
      })
      setScreen('over')
    }
  }, [state.timeLeft, screen, state.score])

  function startGame() {
    setState(initialState(buildDeck(8)))
    setScreen('play')
  }

  function handleSwipe(direction) {
    setState((prev) => {
      const next = applySwipe(prev, direction)
      if (next.lastResult) {
        setFx({ id: Date.now(), ...next.lastResult })
        vibrate(next.lastResult.kind === 'good' ? 20 : [40, 40, 80])
      }
      return next
    })
  }

  // clear FX after a moment
  useEffect(() => {
    if (!fx) return
    const t = setTimeout(() => setFx(null), 700)
    return () => clearTimeout(t)
  }, [fx])

  const current = state.deck[state.index]
  const next = state.deck[state.index + 1]
  const accuracy = useMemo(() => accuracyOf(state), [state])

  return (
    <div className="app">
      {/* HUD */}
      <div className="hud">
        <Brand />
        <div className="hud-stats">
          <span className={`pill ${state.timeLeft <= 10 ? 'warn' : ''}`}>
            <Timer size={14} /> {state.timeLeft}s
          </span>
          <span className="pill score"><Trophy size={14} /> {state.score}</span>
        </div>
      </div>
      <div className="timebar">
        <span style={{ width: `${(state.timeLeft / ROUND_SECONDS) * 100}%` }} />
      </div>

      {/* Stage */}
      <div className="stage">
        <div className="card-stack">
          <AnimatePresence>
            {state.combo >= 3 && screen === 'play' && (
              <motion.div
                key={`combo-${Math.floor(state.combo / 3)}`}
                className="combo"
                initial={{ y: -10, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -10, opacity: 0 }}
              >
                <Flame size={14} style={{ verticalAlign: -2 }} /> {state.combo} streak!
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {fx && (
              <motion.div
                key={fx.id}
                className={`float-fx ${fx.kind}`}
                initial={{ y: 0, opacity: 0, scale: 0.6 }}
                animate={{ y: -50, opacity: 1, scale: 1 }}
                exit={{ y: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {fx.text}
              </motion.div>
            )}
          </AnimatePresence>

          {next && screen === 'play' && (
            <Card key={`next-${state.index + 1}`} plant={next} isTop={false} onSwipe={() => {}} />
          )}
          <AnimatePresence>
            {current && screen === 'play' && (
              <Card key={`top-${state.index}`} plant={current} isTop onSwipe={handleSwipe} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action buttons */}
      {screen === 'play' && (
        <div className="actions">
          <button
            className="action-btn pull big"
            aria-label="Pull (invasive)"
            onClick={() => handleSwipe('pull')}
          >
            <Trash2 size={28} />
          </button>
          <button
            className="action-btn"
            aria-label="Skip"
            onClick={() => setState((s) => ({ ...s, index: s.index + 1 }))}
            title="Skip"
          >
            <RotateCcw size={22} />
          </button>
          <button
            className="action-btn plant big"
            aria-label="Plant (native)"
            onClick={() => handleSwipe('plant')}
          >
            <Sprout size={28} />
          </button>
        </div>
      )}

      {screen === 'play' && (
        <div className="foot">
          <ArrowLeft size={12} style={{ verticalAlign: -1 }} /> Pull invasive ·
          Plant native <ArrowRight size={12} style={{ verticalAlign: -1 }} />
        </div>
      )}

      {/* Home overlay */}
      <AnimatePresence>
        {screen === 'home' && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <a href={SFBBO_URL} target="_blank" rel="noopener noreferrer" className="logo-hero">
              <img src={LOGO_URL} alt="SFBBO" />
            </a>
            <h1 className="title">Plant <span style={{ color: '#f5c84b' }}>or</span> Pull</h1>
            <p className="subtitle">
              Save the South Bay marsh! Swipe <b>right to plant</b> a native, <b>left to pull</b> an
              invader. You have <b>{ROUND_SECONDS} seconds</b>.
            </p>
            <div className="legend">
              <span className="legend-item"><Sprout size={14} color="#86efac" /> Right = Native</span>
              <span className="legend-item"><Skull size={14} color="#fca5a5" /> Left = Invasive</span>
              <span className="legend-item"><Vibrate size={14} /> Haptics on</span>
            </div>
            <button className="cta" onClick={startGame}>
              <Play size={18} /> Start
            </button>
            <a className="learn-more" href={SFBBO_URL} target="_blank" rel="noopener noreferrer">
              Learn about SFBBO's marsh restoration work <ExternalLink size={14} />
            </a>
            {highScore > 0 && (
              <div className="muted">Best score: <b style={{ color: '#f5c84b' }}>{highScore}</b></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over overlay */}
      <AnimatePresence>
        {screen === 'over' && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="title">Time's up!</h1>
            <div className="score-num">{state.score}</div>
            <div className="score-card">
              <div className="score-row"><span>Correct</span><b style={{ color: '#86efac' }}>{state.correct}</b></div>
              <div className="score-row"><span>Wrong</span><b style={{ color: '#fca5a5' }}>{state.wrong}</b></div>
              <div className="score-row"><span>Accuracy</span><b>{accuracy}%</b></div>
              <div className="score-row"><span>Best streak</span><b><Flame size={14} style={{ verticalAlign: -2 }} /> {state.bestCombo}</b></div>
              <div className="score-row"><span>High score</span><b style={{ color: '#f5c84b' }}>{Math.max(highScore, state.score)}</b></div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="cta" onClick={startGame}>
                <RotateCcw size={18} /> Play again
              </button>
              <button className="cta secondary" onClick={() => setScreen('home')}>
                Home
              </button>
            </div>
            <a className="learn-more" href={SFBBO_URL} target="_blank" rel="noopener noreferrer">
              Support SFBBO's work <ExternalLink size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
