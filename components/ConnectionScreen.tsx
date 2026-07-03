'use client'

import { useEffect, useRef, useState } from 'react'

type Line = { text: string; type: 'tag' | 'ok' | 'key' | 'val' | 'sep' | 'empty'; delay: number }

function makeLines(sessionId: string): Line[] {
  return [
    { text: '',                                              type: 'empty', delay: 0 },
    { text: '[INFO] Establishing encrypted connection...',  type: 'tag',   delay: 200 },
    { text: '[INFO] Authenticating visitor...',            type: 'tag',   delay: 750 },
    { text: '[OK]   Session established.',                 type: 'ok',    delay: 1300 },
    { text: '[INFO] Assigning guest privileges...',        type: 'tag',   delay: 1700 },
    { text: '',                                              type: 'empty', delay: 2100 },
    { text: '─'.repeat(44),                               type: 'sep',   delay: 2200 },
    { text: `Connected to   AYBERK_OS`,                   type: 'key',   delay: 2320 },
    { text: `Session ID     ${sessionId}`,                type: 'val',   delay: 2500 },
    { text: `Access Level   Guest`,                       type: 'val',   delay: 2680 },
    { text: '─'.repeat(44),                               type: 'sep',   delay: 2860 },
    { text: '',                                              type: 'empty', delay: 2960 },
  ]
}

const COLOR: Record<Line['type'], string> = {
  tag:   'var(--text-muted)',
  ok:    'var(--success)',
  key:   'var(--text)',
  val:   'var(--text-muted)',
  sep:   'var(--text-dim)',
  empty: 'transparent',
}

interface Props {
  sessionId: string
  onComplete: () => void
  onScroll?: () => void
}

export default function ConnectionScreen({ sessionId, onComplete, onScroll }: Props) {
  const [visible, setVisible] = useState<number[]>([])
  const doneRef = useRef(false)
  const lines = makeLines(sessionId)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisible(v => [...v, i])
        if (i === lines.length - 1 && !doneRef.current) {
          doneRef.current = true
          setTimeout(onComplete, 200)
        }
      }, line.delay))
    })
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { onScroll?.() }, [visible, onScroll])

  return (
    <div className="px-8 pt-8 pb-2 max-w-3xl mx-auto w-full">
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            color: COLOR[line.type],
            opacity: visible.includes(i) ? 1 : 0,
            minHeight: '1.4em',
            transition: 'opacity 110ms',
            fontWeight: line.type === 'key' ? 600 : 400,
            letterSpacing: line.type === 'key' ? '0.01em' : undefined,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  )
}
