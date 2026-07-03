'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const BiosScreen     = dynamic(() => import('@/components/BiosScreen'),     { ssr: false })
const Desktop        = dynamic(() => import('@/components/Desktop'),        { ssr: false })
const TerminalWindow = dynamic(() => import('@/components/TerminalWindow'), { ssr: false })

function genSessionId() {
  const seg = () => Math.random().toString(16).slice(2, 6).toUpperCase()
  return `${seg()}-${seg()}-${seg()}`
}

export default function Home() {
  const [phase, setPhase]               = useState<'bios' | 'desktop'>('bios')
  const [iconClicking, setIconClicking] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [glitching, setGlitching]       = useState(false)
  const [iconCmd, setIconCmd]           = useState<string | null>(null)
  const [crtOff, setCrtOff]             = useState(false)
  const [sessionId]                     = useState(genSessionId)

  const ICON_CMDS: Record<string, string> = {
    projects:   'ls projects/',
    experience: 'ls experience/',
    resume:     'cat about.txt',
    contact:    'cat contact.txt',
    browser:    'open careershipai.com',
  }

  useEffect(() => {
    const handle = () => setCrtOff(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', handle)
    return () => document.removeEventListener('visibilitychange', handle)
  }, [])

  const handleGlitch = useCallback(() => {
    setGlitching(true)
    setTimeout(() => setGlitching(false), 2400)
  }, [])

  const handleBiosComplete = useCallback(() => {
    setPhase('desktop')
    setTimeout(() => setIconClicking(true),  1400)
    setTimeout(() => setIconClicking(false), 1900)
    setTimeout(() => setTerminalOpen(true),  1950)
  }, [])

  const handleTerminalOpen = useCallback(() => {
    if (terminalOpen) return
    setIconClicking(true)
    setTimeout(() => { setIconClicking(false); setTerminalOpen(true) }, 500)
  }, [terminalOpen])

  const handleIconClick = useCallback((id: string) => {
    const cmd = ICON_CMDS[id]
    if (!cmd) return
    if (!terminalOpen) {
      handleTerminalOpen()
      setTimeout(() => setIconCmd(cmd), 3000)
    } else {
      setIconCmd(cmd)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminalOpen, handleTerminalOpen])

  return (
    <div className={`scanlines vignette${glitching ? ' screen-glitch' : ''}${crtOff ? ' crt-poweroff' : ''}`}>
      <div className="glitch-overlay-r" aria-hidden="true" />
      <div className="glitch-overlay-c" aria-hidden="true" />

      {phase === 'bios' && (
        <BiosScreen onComplete={handleBiosComplete} />
      )}

      {phase === 'desktop' && (
        <Desktop terminalIconClicking={iconClicking} onTerminalOpen={handleTerminalOpen} onIconClick={handleIconClick}>
          <TerminalWindow
            onGlitch={handleGlitch}
            isOpen={terminalOpen}
            sessionId={sessionId}
            externalCmd={iconCmd}
            onExternalCmdConsumed={() => setIconCmd(null)}
          />
        </Desktop>
      )}
    </div>
  )
}
