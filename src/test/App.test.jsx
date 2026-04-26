import React from 'react'
import { act } from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../App.jsx'

describe('App start countdown', () => {
  beforeEach(() => {
    let store = {}
    vi.stubGlobal('localStorage', {
      getItem: (key) => store[key] ?? null,
      setItem: (key, value) => {
        store[key] = String(value)
      },
      removeItem: (key) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    })
    localStorage.clear()
    localStorage.setItem('pop_tutorial_seen', '1')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('shows a countdown before entering the round', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    expect(screen.getByText(/get ready/i)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByLabelText(/plant \(native\)/i)).not.toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('2')).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('1')).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByLabelText(/plant \(native\)/i)).toBeInTheDocument()
  })
})