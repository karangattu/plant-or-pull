// Pure game logic — no React, easy to unit test.

export const ROUND_SECONDS = 45
export const WRONG_TIME_PENALTY = 2
export const COMBO_BONUS_STEP = 3 // +1 bonus point per N correct in a row
export const COMBO_BONUS_MAX = 5

/**
 * Decide whether a swipe direction matches the plant type.
 * @param {'plant'|'pull'} direction
 * @param {{type:'native'|'invasive'}} plant
 */
export function isSwipeCorrect(direction, plant) {
  if (!plant) return false
  if (direction === 'plant') return plant.type === 'native'
  if (direction === 'pull') return plant.type === 'invasive'
  return false
}

/**
 * Compute the points gained on a correct swipe given current combo (BEFORE incrementing).
 */
export function pointsFor(combo) {
  const bonus = Math.min(COMBO_BONUS_MAX, Math.floor(combo / COMBO_BONUS_STEP))
  return 1 + bonus
}

/**
 * Apply a swipe to the current state, returning the next state.
 * Pure function — no side effects, no DOM, no vibration.
 */
export function applySwipe(state, direction) {
  const plant = state.deck[state.index]
  if (!plant) return state

  if (isSwipeCorrect(direction, plant)) {
    const gained = pointsFor(state.combo)
    const nextCombo = state.combo + 1
    return {
      ...state,
      score: state.score + gained,
      correct: state.correct + 1,
      combo: nextCombo,
      bestCombo: Math.max(state.bestCombo, nextCombo),
      index: state.index + 1,
      lastResult: { kind: 'good', text: `+${gained}` },
    }
  }

  return {
    ...state,
    score: Math.max(0, state.score - 1),
    wrong: state.wrong + 1,
    combo: 0,
    timeLeft: Math.max(0, state.timeLeft - WRONG_TIME_PENALTY),
    index: state.index + 1,
    lastResult: { kind: 'bad', text: `−${WRONG_TIME_PENALTY}s` },
  }
}

export function initialState(deck) {
  return {
    deck,
    index: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    combo: 0,
    bestCombo: 0,
    timeLeft: ROUND_SECONDS,
    lastResult: null,
  }
}

export function accuracyOf({ correct, wrong }) {
  const total = correct + wrong
  return total ? Math.round((correct / total) * 100) : 0
}
