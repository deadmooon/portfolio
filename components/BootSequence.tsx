'use client'

import { useEffect, useRef, useState } from 'react'

type BootLine = {
  text: string
  type: 'system' | 'command' | 'success' | 'error' | 'empty' | 'dim'
  delay: number
  typewriter?: boolean
}

const LINES: BootLine[] = [
  { text: 'AYBERK_OS v2026.07.04 [build: ayd1n-2026]', type: 'system',  delay: 0 },
  { text: '─'.repeat(46),                               type: 'dim',     delay: 150 },
  { text: 'Initializing kernel modules...',             type: 'system',  delay: 350 },
  { text: 'Loading security_stack      ████████████ OK',type: 'success', delay: 750 },
  { text: 'Loading web_runtime         ████████████ OK',type: 'success', delay: 1150 },
  { text: 'Loading ai_modules          ████████████ OK',type: 'success', delay: 1550 },
  { text: '',                                           type: 'empty',   delay: 1900 },
  { text: 'sudo su',                                    type: 'command', delay: 2200, typewriter: true },
  { text: 'bash: sudo: Permission denied — nice try :)', type: 'error',  delay: 5800 },
  { text: '',                                           type: 'empty',   delay: 6100 },
  { text: "Guest shell initialized. Type 'help' to explore.", type: 'system', delay: 6300 },
]

const BOOT_HANDLE = 'ayberk@ayberkayd.in:~$'

function lineStyle(type: BootLine['type']): React.CSSProperties {
  switch (type) {
    case 'system':  return { color: 'var(--text-muted)' }
    case 'command': return { color: 'var(--text)' }
    case 'success': return { color: 'var(--success)' }
    case 'error':   return { color: 'var(--error)' }
    case 'dim':     return { color: 'var(--text-dim)' }
    default:        return {}
  }
}

interface Props {
  onGlitch: () => void
  onComplete: () => void
  onScroll?: () => void
}

export default function BootSequence({ onGlitch, onComplete, onScroll }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterDone, setTypewriterDone] = useState(false)
  const glitchFired = useRef(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let twInterval: ReturnType<typeof setInterval> | null = null

    LINES.forEach((line, i) => {
      if (line.typewriter) {
        timers.push(setTimeout(() => {
          setVisibleLines(v => [...v, i])
          let idx = 0
          const chars = line.text.split('')
          twInterval = setInterval(() => {
            idx++
            setTypewriterText(chars.slice(0, idx).join(''))
            if (idx === chars.length) {
              clearInterval(twInterval!)
              twInterval = null
              setTimeout(() => {
                if (!glitchFired.current) {
                  glitchFired.current = true
                  onGlitch()
                }
                setTypewriterDone(true)
              }, 500)
            }
          }, 60)
        }, line.delay))
      } else {
        timers.push(setTimeout(() => {
          setVisibleLines(v => [...v, i])
          if (i === LINES.length - 1) {
            setTimeout(() => onComplete(), 500)
          }
        }, line.delay))
      }
    })

    return () => {
      timers.forEach(clearTimeout)
      if (twInterval) clearInterval(twInterval)
    }
  }, [onGlitch, onComplete])

  useEffect(() => { onScroll?.() }, [visibleLines, typewriterText, onScroll])

  return (
    <section className="px-8 pt-8 pb-4 max-w-3xl mx-auto w-full">
      <div className="space-y-0.5 glitch-content">
        {LINES.map((line, i) => {
          if (!visibleLines.includes(i)) return null
          const isTw      = !!line.typewriter
          const isCommand = line.type === 'command'

          return (
            <div key={i} className="flex gap-3 leading-relaxed">
              {isCommand && (
                <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{BOOT_HANDLE}</span>
              )}
              <span style={lineStyle(line.type)}>
                {isTw
                  ? <>{typewriterText}{!typewriterDone && <span className="cursor" />}</>
                  : line.text}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
