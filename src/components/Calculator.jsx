import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeonButton from './NeonButton'
import { History, Moon, Sun } from 'lucide-react'

const fontStack = 'Orbitron, Rajdhani, Inter Tight, Inter, Poppins, system-ui, sans-serif'

function Cursor() {
  return (
    <motion.span
      aria-hidden
      className="inline-block w-[2px] h-[1.2em] align-[-0.15em] ml-1 bg-[#00FFD1]"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  )
}

function Display({ expression, result, theme }) {
  return (
    <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="text-white/70 text-sm md:text-base" style={{ fontFamily: fontStack }}>{expression || '0'}<Cursor /></div>
      <div className="mt-2 md:mt-3 text-4xl md:text-6xl font-extrabold text-white tracking-wide" style={{ fontFamily: fontStack }}>
        {result}
      </div>
    </div>
  )
}

export default function Calculator() {
  const [theme, setTheme] = useState('dark')
  const [showHistory, setShowHistory] = useState(false)
  const [mode, setMode] = useState('standard')
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [history, setHistory] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.jsdelivr.net/gh/jhancock532/audio-ui/click-soft-03.mp3')
    audioRef.current.volume = 0.25
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const append = (val) => {
    play()
    setExpression((prev) => (prev + val).replace(/^0+(\d)/, '$1'))
  }

  const clearAll = () => {
    play()
    setExpression('')
    setResult('0')
  }

  const del = () => {
    play()
    setExpression((prev) => prev.slice(0, -1))
  }

  const evaluateExpression = () => {
    play()
    try {
      // simple safe eval using Function with sanitized expression
      const sanitized = expression.replace(/[^0-9+\-*/().%]/g, '')
      // Replace division symbol if present
      const toEval = sanitized
      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${toEval || '0'})`)()
      const res = Number.isFinite(value) ? String(value) : 'Error'
      setResult(res)
      if (expression) {
        setHistory((h) => [{ exp: expression, res, t: Date.now() }, ...h].slice(0, 10))
      }
    } catch (_) {
      setResult('Error')
    }
  }

  const buttonsStandard = [
    { label: 'C', variant: 'clear', onClick: clearAll },
    { label: '⌫', variant: 'function', onClick: del },
    { label: '%', variant: 'operator', onClick: () => append('%') },
    { label: '÷', variant: 'operator', onClick: () => append('/') },

    { label: '7', onClick: () => append('7') },
    { label: '8', onClick: () => append('8') },
    { label: '9', onClick: () => append('9') },
    { label: '×', variant: 'operator', onClick: () => append('*') },

    { label: '4', onClick: () => append('4') },
    { label: '5', onClick: () => append('5') },
    { label: '6', onClick: () => append('6') },
    { label: '–', variant: 'operator', onClick: () => append('-') },

    { label: '1', onClick: () => append('1') },
    { label: '2', onClick: () => append('2') },
    { label: '3', onClick: () => append('3') },
    { label: '+', variant: 'operator', onClick: () => append('+') },

    { label: '0', onClick: () => append('0') },
    { label: '.', onClick: () => append('.') },
    { label: '=', span: 2, variant: 'equals', onClick: evaluateExpression },
  ]

  const buttonsScientific = [
    { label: 'sin', variant: 'function', onClick: () => append('Math.sin(') },
    { label: 'cos', variant: 'function', onClick: () => append('Math.cos(') },
    { label: 'tan', variant: 'function', onClick: () => append('Math.tan(') },
    { label: 'π', variant: 'function', onClick: () => append('Math.PI') },
    { label: '√', variant: 'function', onClick: () => append('Math.sqrt(') },
    { label: 'x²', variant: 'function', onClick: () => append('**2') },
    { label: 'ln', variant: 'function', onClick: () => append('Math.log(') },
    { label: 'e', variant: 'function', onClick: () => append('Math.E') },
  ]

  return (
    <div className="relative min-h-screen bg-[#0E0E10] text-white">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#00FFD1]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      {/* top nav */}
      <div className="sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold tracking-widest" style={{ fontFamily: fontStack }}>
              <span className="text-white">Neon</span>
              <span className="text-[#00FFD1]">Calc</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                className="rounded-xl p-2 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                aria-label="History"
                onClick={() => setShowHistory((s) => !s)}
                className="rounded-xl p-2 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <History size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-8 grid gap-6">
        {/* display */}
        <Display expression={expression} result={result} theme={theme} />

        {/* mode toggle */}
        <div className="flex items-center justify-between">
          <div className="text-white/70" style={{ fontFamily: fontStack }}>Mode</div>
          <div className="inline-flex rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {['standard', 'scientific'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 text-sm md:text-base ${mode === m ? 'bg-[#00FFD1]/20 text-[#00FFD1]' : 'text-white/70 hover:bg-white/10'}`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* scientific row */}
        <AnimatePresence initial={false}>
          {mode === 'scientific' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-4 gap-3 md:gap-4"
            >
              {buttonsScientific.map((b) => (
                <NeonButton key={b.label} {...b} variant={b.variant || 'function'} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* keypad */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {buttonsStandard.map((b) => (
            <NeonButton key={b.label} {...b} variant={b.variant || 'number'} />
          ))}
        </div>
      </div>

      {/* history panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-5xl px-4 pb-6"
          >
            <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 p-4 md:p-6 shadow-[0_0_40px_rgba(0,255,209,0.15)]">
              <div className="text-white/80 mb-3" style={{ fontFamily: fontStack }}>History</div>
              <div className="max-h-56 overflow-y-auto space-y-2">
                {history.length === 0 ? (
                  <div className="text-white/60">No calculations yet</div>
                ) : (
                  history.map((h) => (
                    <div key={h.t} className="flex items-center justify-between text-white/85">
                      <div style={{ fontFamily: fontStack }}>{h.exp}</div>
                      <div className="text-[#00FFD1] font-bold">{h.res}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
