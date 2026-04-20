import { describe, it, expect } from 'vitest'
import {
  isSwipeCorrect,
  pointsFor,
  applySwipe,
  initialState,
  accuracyOf,
  ROUND_SECONDS,
  WRONG_TIME_PENALTY,
} from '../game.js'

const native = { name: 'N', type: 'native', emoji: '🌱', note: '' }
const invasive = { name: 'I', type: 'invasive', emoji: '⭐', note: '' }

describe('isSwipeCorrect', () => {
  it('plant + native = correct', () => {
    expect(isSwipeCorrect('plant', native)).toBe(true)
  })
  it('pull + invasive = correct', () => {
    expect(isSwipeCorrect('pull', invasive)).toBe(true)
  })
  it('plant + invasive = wrong', () => {
    expect(isSwipeCorrect('plant', invasive)).toBe(false)
  })
  it('pull + native = wrong', () => {
    expect(isSwipeCorrect('pull', native)).toBe(false)
  })
  it('handles missing plant safely', () => {
    expect(isSwipeCorrect('plant', undefined)).toBe(false)
  })
})

describe('pointsFor', () => {
  it('awards 1 point with no combo', () => {
    expect(pointsFor(0)).toBe(1)
    expect(pointsFor(1)).toBe(1)
    expect(pointsFor(2)).toBe(1)
  })
  it('adds +1 bonus every 3 in a row', () => {
    expect(pointsFor(3)).toBe(2)
    expect(pointsFor(6)).toBe(3)
    expect(pointsFor(9)).toBe(4)
  })
  it('caps the combo bonus at +5', () => {
    expect(pointsFor(15)).toBe(6)
    expect(pointsFor(99)).toBe(6)
  })
})

describe('applySwipe', () => {
  it('rewards a correct plant swipe and increments combo', () => {
    const s = initialState([native, invasive])
    const next = applySwipe(s, 'plant')
    expect(next.score).toBe(1)
    expect(next.correct).toBe(1)
    expect(next.wrong).toBe(0)
    expect(next.combo).toBe(1)
    expect(next.bestCombo).toBe(1)
    expect(next.index).toBe(1)
    expect(next.lastResult).toEqual({ kind: 'good', text: '+1' })
  })

  it('penalises a wrong swipe with score, combo reset, and time loss', () => {
    const s = { ...initialState([invasive]), combo: 4, score: 5 }
    const next = applySwipe(s, 'plant') // invasive but swiped plant => wrong
    expect(next.score).toBe(4)
    expect(next.wrong).toBe(1)
    expect(next.combo).toBe(0)
    expect(next.timeLeft).toBe(ROUND_SECONDS - WRONG_TIME_PENALTY)
    expect(next.lastResult.kind).toBe('bad')
  })

  it('never lets the score go below zero', () => {
    const s = { ...initialState([native]), score: 0 }
    const next = applySwipe(s, 'pull') // wrong
    expect(next.score).toBe(0)
  })

  it('never lets timeLeft go below zero', () => {
    const s = { ...initialState([native]), timeLeft: 1 }
    const next = applySwipe(s, 'pull') // wrong, -2s
    expect(next.timeLeft).toBe(0)
  })

  it('grants the combo bonus once the streak crosses the threshold', () => {
    let s = initialState([native, native, native, native])
    s = applySwipe(s, 'plant') // combo 0 -> 1, +1
    s = applySwipe(s, 'plant') // combo 1 -> 2, +1
    s = applySwipe(s, 'plant') // combo 2 -> 3, +1
    s = applySwipe(s, 'plant') // combo 3 -> 4, +2 (bonus kicks in)
    expect(s.score).toBe(1 + 1 + 1 + 2)
    expect(s.bestCombo).toBe(4)
  })
})

describe('accuracyOf', () => {
  it('is 0 when no answers yet', () => {
    expect(accuracyOf({ correct: 0, wrong: 0 })).toBe(0)
  })
  it('rounds to the nearest percent', () => {
    expect(accuracyOf({ correct: 1, wrong: 2 })).toBe(33)
    expect(accuracyOf({ correct: 2, wrong: 1 })).toBe(67)
    expect(accuracyOf({ correct: 5, wrong: 0 })).toBe(100)
  })
})
