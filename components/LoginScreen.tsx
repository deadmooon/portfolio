'use client'

import { useEffect, useState } from 'react'

type Phase = 'user-typing' | 'pass-prompt' | 'pass-typing' | 'authenticating' | 'granted'

interface Props {
  onComplete: () => void
}

const USERNAME = 'guest'
const PASSWORD = '••••••••'

export default function LoginScreen({ onComplete }: Props) {
  const [phase, setPhase]   = useState<Phase>('user-typing')
  const [userText, setUserText] = useState('')
  const [passText, setPassText] = useState('')

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // type username
    USERNAME.split('').forEach((ch, i) => {
      timers.push(setTimeout(() => setUserText(USERNAME.slice(0, i + 1)), 300 + i * 90))
    })

    const afterUser = 300 + USERNAME.length * 90 + 200

    // show password prompt
    timers.push(setTimeout(() => setPhase('pass-typing'), afterUser))

    // type password
    PASSWORD.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setPassText(PASSWORD.slice(0, i + 1)), afterUser + 80 + i * 90))
    })

    const afterPass = afterUser + 80 + PASSWORD.length * 90 + 200

    // authenticating
    timers.push(setTimeout(() => setPhase('authenticating'), afterPass))

    // granted
    timers.push(setTimeout(() => setPhase('granted'), afterPass + 900))

    // done
    timers.push(setTimeout(() => onComplete(), afterPass + 1700))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: 'var(--font-jetbrains), monospace',
      fontSize: '14px', lineHeight: 1.9,
    }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 2rem' }}>

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: 'var(--prompt)', fontWeight: 700, fontSize: '1.1em', letterSpacing: '0.08em' }}>
            AYBERK_OS
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.82em' }}>
            v2026.07.04 — Secure Login
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />

        {/* username */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span style={{ color: 'var(--text-dim)', width: '9rem', flexShrink: 0 }}>Username:</span>
          <span style={{ color: 'var(--text)' }}>
            {userText}
            {phase === 'user-typing' && userText.length < USERNAME.length && (
              <span className="cursor" />
            )}
          </span>
        </div>

        {/* password */}
        {phase !== 'user-typing' && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ color: 'var(--text-dim)', width: '9rem', flexShrink: 0 }}>Password:</span>
            <span style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              {passText}
              {phase === 'pass-typing' && passText.length < PASSWORD.length && (
                <span className="cursor" />
              )}
            </span>
          </div>
        )}

        {/* status */}
        {(phase === 'authenticating' || phase === 'granted') && (
          <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div style={{ color: 'var(--text-muted)' }}>Authenticating…</div>
            {phase === 'granted' && (
              <div style={{ color: 'var(--success)', marginTop: '0.25rem' }}>
                Access granted. Loading desktop…
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
