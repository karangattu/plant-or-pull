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
  Target,
  CheckCircle2,
  XCircle,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import splashSrc from '../assets/GAME_SPLASH_SCREEN.png'
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

// ---------- Plant artwork: image with generic fallback ----------
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
  return <Leaf size={64} color="#86efac" aria-hidden />
}

// ---------- Card ----------
function Card({ plant, onSwipe, isTop }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], [-18, 0, 18])
  const leftOpacity = useTransform(x, [-160, -40, 0], [1, 0.2, 0])
  const rightOpacity = useTransform(x, [0, 40, 160], [0, 0.2, 1])
  const [showHint, setShowHint] = useState(false)

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
        <button
          type="button"
          className="hint-toggle"
          onClick={(event) => {
            event.stopPropagation()
            setShowHint((value) => !value)
          }}
          onPointerDown={(event) => event.stopPropagation()}
          aria-expanded={showHint}
          aria-controls={`hint-${plant.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
        >
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
        {showHint && (
          <p
            id={`hint-${plant.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
            className="card-hint"
          >
            {plant.note}
          </p>
        )}
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

// ---------- Tutorial ----------
const TUTORIAL_STEPS = [
  {
    icon: Sprout,
    iconColor: '#86efac',
    title: 'Plant the natives',
    body: 'When you see a native marsh plant, swipe the card to the right (or tap the green Plant button). Natives like Pickleweed and Saltgrass keep the marsh healthy.',
  },
  {
    icon: Trash2,
    iconColor: '#fca5a5',
    title: 'Pull the invasives',
    body: 'Spot an invasive species like Pampas Grass or Fennel? Swipe left (or tap the red Pull button) to remove it before it takes over.',
  },
  {
    icon: Leaf,
    iconColor: '#0f766e',
    title: 'Need a clue?',
    body: 'Tap "Show hint" on any card for a quick fact about the plant.',
  },
  {
    icon: Flame,
    iconColor: '#f5c84b',
    title: 'Build a streak',
    body: 'Get cards right in a row to build a streak — every 3 in a row earns bonus points. The clock keeps ticking, so trust your eyes!',
  },
]

function Tutorial({ onClose, onStart, autoStarted }) {
  const [step, setStep] = useState(0)
  const total = TUTORIAL_STEPS.length
  const current = TUTORIAL_STEPS[step]
  const Icon = current.icon
  const isLast = step === total - 1

  function next() {
    if (isLast) {
      if (autoStarted) onStart()
      else onClose()
    } else {
      setStep((s) => s + 1)
    }
  }
  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  return (
    <motion.div
      className="tutorial-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How to play tutorial"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="tutorial-card"
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }}
      >
        <div className="tutorial-progress" aria-hidden>
          {TUTORIAL_STEPS.map((_, i) => (
            <span key={i} className={i === step ? 'active' : i < step ? 'done' : ''} />
          ))}
        </div>

        <button
          type="button"
          className="tutorial-skip"
          onClick={() => (autoStarted ? onStart() : onClose())}
          aria-label="Skip tutorial"
        >
          Skip
        </button>

        <div className="tutorial-icon" style={{ color: current.iconColor }}>
          <Icon size={56} />
        </div>
        <div className="tutorial-step-num">Step {step + 1} of {total}</div>
        <h2 className="tutorial-title">{current.title}</h2>
        <p className="tutorial-body">{current.body}</p>

        <div className="tutorial-actions">
          <button
            type="button"
            className="tutorial-btn secondary"
            onClick={back}
            disabled={step === 0}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            type="button"
            className="tutorial-btn primary"
            onClick={next}
          >
            {isLast ? (
              autoStarted ? (
                <><Play size={16} /> Start game</>
              ) : (
                <>Got it</>
              )
            ) : (
              <>Next <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------- App ----------
export default function App() {
  const [screen, setScreen] = useState('home') // home | play | over
  const [state, setState] = useState(() => initialState(buildDeck(8)))
  const [fx, setFx] = useState(null)
  const [tutorial, setTutorial] = useState(null) // null | { autoStarted: boolean }
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0
    return Number(localStorage.getItem('pop_high') || 0)
  })

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  // Auto-show the tutorial the first time someone opens the game.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem('pop_tutorial_seen') !== '1') {
        setTutorial({ autoStarted: true })
      }
    } catch {}
  }, [])

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

  function markTutorialSeen() {
    try { localStorage.setItem('pop_tutorial_seen', '1') } catch {}
  }

  function closeTutorial() {
    markTutorialSeen()
    setTutorial(null)
  }

  function tutorialStartGame() {
    markTutorialSeen()
    setTutorial(null)
    startGame()
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
          <button
            type="button"
            className="fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            title={isFullscreen ? 'Exit full screen' : 'Full screen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
      <div className="timebar">
        <span style={{ width: `${(state.timeLeft / ROUND_SECONDS) * 100}%` }} />
      </div>

      {/* Stage */}
      <div className="play-area">
        <aside className="side-panel side-left" aria-hidden={screen !== 'play'}>
          <div className="side-card">
            <div className="side-kicker">How to play</div>
            <ul className="side-list">
              <li><Sprout size={16} color="#86efac" /> Swipe <b>right</b> to <b>plant</b> a native species.</li>
              <li><Trash2 size={16} color="#fca5a5" /> Swipe <b>left</b> to <b>pull</b> an invasive species.</li>
              <li><RotateCcw size={16} /> Tap the middle button to skip a card.</li>
              <li><Flame size={16} color="#f5c84b" /> Build a streak for bonus points.</li>
            </ul>
          </div>
          <div className="side-card subtle">
            <div className="side-kicker">Tap a card</div>
            <p className="side-copy">Tap <b>Show hint</b> for a clue about the plant.</p>
          </div>
        </aside>

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
            <Card
              key={`next-${state.index + 1}`}
              plant={next}
              isTop={false}
              onSwipe={() => {}}
            />
          )}
          <AnimatePresence>
            {current && screen === 'play' && (
              <Card
                key={`top-${state.index}`}
                plant={current}
                isTop
                onSwipe={handleSwipe}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

        <aside className="side-panel side-right" aria-hidden={screen !== 'play'}>
          <div className="side-card">
            <div className="side-kicker">Round stats</div>
            <div className="side-stats">
              <div className="side-stat"><CheckCircle2 size={16} color="#86efac" /><span>Correct</span><b>{state.correct}</b></div>
              <div className="side-stat"><XCircle size={16} color="#fca5a5" /><span>Wrong</span><b>{state.wrong}</b></div>
              <div className="side-stat"><Target size={16} color="#f5c84b" /><span>Accuracy</span><b>{accuracy}%</b></div>
              <div className="side-stat"><Flame size={16} color="#f5c84b" /><span>Streak</span><b>{state.combo}</b></div>
              <div className="side-stat"><Trophy size={16} color="#f5c84b" /><span>Best</span><b>{Math.max(highScore, state.score)}</b></div>
            </div>
          </div>
          <div className="side-card subtle">
            <div className="side-kicker">Cards left</div>
            <div className="side-cards-left">{Math.max(state.deck.length - state.index, 0)}</div>
          </div>
        </aside>
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
            <button
              type="button"
              className="fullscreen-btn overlay-fullscreen-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <a href={SFBBO_URL} target="_blank" rel="noopener noreferrer" className="splash-logo">
              <img src={LOGO_URL} alt="SFBBO" />
            </a>
            <img src={splashSrc} alt="Plant or Pull" className="splash-hero" />
            <p className="subtitle">
              Save the South Bay marsh! Swipe <b>right to plant</b> a native, <b>left to pull</b> an
              invasive. You have <b>{ROUND_SECONDS} seconds</b>.
            </p>
            <div className="legend">
              <span className="legend-item"><Sprout size={14} color="#86efac" /> Right = Native</span>
              <span className="legend-item"><Skull size={14} color="#fca5a5" /> Left = Invasive</span>
              <span className="legend-item"><Vibrate size={14} /> Haptics on</span>
            </div>
            <button className="cta" onClick={startGame}>
              <Play size={18} /> Start
            </button>
            <button
              type="button"
              className="cta secondary"
              onClick={() => setTutorial({ autoStarted: false })}
            >
              How to play
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

      <AnimatePresence>
        {tutorial && (
          <Tutorial
            autoStarted={tutorial.autoStarted}
            onClose={closeTutorial}
            onStart={tutorialStartGame}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
