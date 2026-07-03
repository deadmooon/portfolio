'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ConnectionScreen = dynamic(() => import('./ConnectionScreen'), { ssr: false })
const BootSequence     = dynamic(() => import('./BootSequence'),     { ssr: false })
const TerminalSession  = dynamic(() => import('./TerminalSession'),  { ssr: false })

interface Props {
  onGlitch: () => void
  isOpen: boolean
  sessionId: string
  externalCmd?: string | null
  onExternalCmdConsumed?: () => void
}

export default function TerminalWindow({ onGlitch, isOpen, sessionId, externalCmd, onExternalCmdConsumed }: Props) {
  const [connectionDone, setConnectionDone] = useState(false)
  const [bootDone, setBootDone] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  if (!isOpen) return null

  return (
    <div className="terminal-window glitch-content">
      <div className="terminal-window-chrome">
        <div className="terminal-window-dots">
          <span className="window-dot window-dot--red"   />
          <span className="window-dot window-dot--amber" />
          <span className="window-dot window-dot--green" />
        </div>
        <span className="terminal-window-title">Terminal — guest@ayberk</span>
        <div style={{ width: '52px' }} />
      </div>

      <div ref={bodyRef} className="terminal-window-body">
        <ConnectionScreen sessionId={sessionId} onComplete={() => setConnectionDone(true)} onScroll={scrollToBottom} />
        {connectionDone && (
          <BootSequence onGlitch={onGlitch} onComplete={() => setBootDone(true)} onScroll={scrollToBottom} />
        )}
        {bootDone && (
          <TerminalSession
            onGlitch={onGlitch}
            externalCmd={externalCmd}
            onExternalCmdConsumed={onExternalCmdConsumed}
            onScroll={scrollToBottom}
          />
        )}
      </div>
    </div>
  )
}
