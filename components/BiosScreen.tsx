'use client'

import { useEffect, useRef, useState } from 'react'

type BiosLine = {
  text: string
  type: 'header' | 'ok' | 'info' | 'dim' | 'empty' | 'launch'
  delay: number
}

const LINES: BiosLine[] = [
  { text: 'AYBERK BIOS v2.6.0  ─  Copyright © 2026 Ayberk Systems', type: 'header', delay: 0 },
  { text: '─'.repeat(56),                                            type: 'dim',    delay: 60 },
  { text: '',                                                         type: 'empty',  delay: 100 },
  { text: 'CPU  › AMD Ryzen 9 7950X  ·  16C / 32T  ·  5.7 GHz',   type: 'info',   delay: 140 },
  { text: 'Initializing CPU................................ OK',       type: 'ok',     delay: 260 },
  { text: 'Detecting Memory......................... 32768 MB',       type: 'ok',     delay: 420 },
  { text: 'Loading NVMe Storage.......................... OK',        type: 'ok',     delay: 580 },
  { text: 'Initializing Network Interface................. OK',       type: 'ok',     delay: 740 },
  { text: 'Loading Security Stack........................ OK',        type: 'ok',     delay: 900 },
  { text: 'Starting Kernel............................... OK',        type: 'ok',     delay: 1060 },
  { text: 'Mounting Filesystem........................... OK',        type: 'ok',     delay: 1220 },
  { text: '',                                                         type: 'empty',  delay: 1360 },
  { text: 'Boot Device  ›  NVMe SSD  /dev/nvme0n1p1',              type: 'info',   delay: 1420 },
  { text: '',                                                         type: 'empty',  delay: 1580 },
  { text: 'Launching AYBERK_OS...',                                  type: 'launch', delay: 1640 },
]

const LINE_COLOR: Record<BiosLine['type'], string> = {
  header: 'var(--text)',
  ok:     'var(--success)',
  info:   'var(--text-muted)',
  dim:    'var(--text-dim)',
  empty:  'transparent',
  launch: 'var(--prompt)',
}

interface Props { onComplete: () => void }

export default function BiosScreen({ onComplete }: Props) {
  const [visible, setVisible] = useState<number[]>([])
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setExiting(true)
    setTimeout(onComplete, 480)
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisible(v => [...v, i])
        if (i === LINES.length - 1) setTimeout(finish, 380)
      }, line.delay))
    })
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'var(--bg)',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 480ms ease',
        zIndex: 100,
      }}
    >
      <div className="px-12 py-8 max-w-2xl w-full">
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              color: LINE_COLOR[line.type],
              opacity: visible.includes(i) ? 1 : 0,
              minHeight: '1.4em',
              transition: 'opacity 100ms',
              fontWeight: line.type === 'header' ? 600 : 400,
              letterSpacing: line.type === 'header' ? '0.04em' : undefined,
            }}
          >
            {line.text}
          </div>
        ))}

        <div style={{ color: 'var(--text-dim)', fontSize: '0.78em', marginTop: '2rem', opacity: visible.length > 2 ? 0.6 : 0, transition: 'opacity 300ms' }}>
          Press ESC to skip
        </div>
      </div>
    </div>
  )
}
