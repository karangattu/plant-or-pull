import { describe, it, expect } from 'vitest'
import { PLANTS, shuffle, buildDeck, resolveImage } from '../plants.js'

describe('PLANTS catalogue', () => {
  it('has at least 10 native and 10 invasive entries', () => {
    const natives = PLANTS.filter((p) => p.type === 'native')
    const invasives = PLANTS.filter((p) => p.type === 'invasive')
    expect(natives.length).toBeGreaterThanOrEqual(10)
    expect(invasives.length).toBeGreaterThanOrEqual(10)
  })

  it('every plant has the required fields', () => {
    for (const p of PLANTS) {
      expect(typeof p.name).toBe('string')
      expect(p.name.length).toBeGreaterThan(0)
      expect(['native', 'invasive']).toContain(p.type)
      expect(typeof p.emoji).toBe('string')
      expect(typeof p.note).toBe('string')
    }
  })

  it('plant names are unique', () => {
    const names = PLANTS.map((p) => p.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('shuffle', () => {
  it('returns an array of the same length with the same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input)
    expect(out).toHaveLength(input.length)
    expect([...out].sort()).toEqual([...input].sort())
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = input.slice()
    shuffle(input)
    expect(input).toEqual(copy)
  })

  it('is deterministic when given a seeded random', () => {
    const seeded = () => 0 // always pick index 0
    expect(shuffle([1, 2, 3, 4], seeded)).toEqual(shuffle([1, 2, 3, 4], seeded))
  })
})

describe('buildDeck', () => {
  it('produces rounds × source.length cards', () => {
    const src = [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
    expect(buildDeck(4, src)).toHaveLength(12)
  })

  it('defaults to the real PLANTS catalogue', () => {
    const deck = buildDeck(2)
    expect(deck.length).toBe(PLANTS.length * 2)
  })
})

describe('resolveImage', () => {
  it('returns null for empty input', () => {
    expect(resolveImage(null)).toBeNull()
    expect(resolveImage('')).toBeNull()
  })

  it('passes absolute URLs through', () => {
    expect(resolveImage('https://example.com/x.jpg')).toBe('https://example.com/x.jpg')
  })

  it('prefixes a relative path with the Vite base URL', () => {
    // In tests BASE_URL is '/'
    expect(resolveImage('/plants/x.jpg')).toBe('/plants/x.jpg')
    expect(resolveImage('plants/x.jpg')).toBe('/plants/x.jpg')
  })
})
