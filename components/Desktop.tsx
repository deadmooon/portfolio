'use client'

import { useEffect, useState } from 'react'

type Icon = { id: string; symbol: string; label: string }

const ICONS: Icon[] = [
  { id: 'terminal',   symbol: '>_', label: 'Terminal'   },
  { id: 'projects',   symbol: '◈',  label: 'Projects'   },
  { id: 'experience', symbol: '◉',  label: 'Experience' },
  { id: 'resume',     symbol: '≡',  label: 'Resume'     },
  { id: 'contact',    symbol: '◎',  label: 'Contact'    },
  { id: 'browser',    symbol: '⊕',  label: 'Browser'    },
]

const SERVICES = ['portfolio.service', 'terminal.service', 'visitor.service', 'firewall.service']
const LOG_PERIODIC = [
  'SSL certificate OK', 'Port scan blocked', 'Auth token refreshed',
  'Memory GC cycle', 'Route optimized', 'Firewall rules OK',
  'Connection keep-alive', 'Session extended', 'Intrusion check OK',
]

interface Props {
  terminalIconClicking: boolean
  onTerminalOpen: () => void
  onIconClick: (id: string) => void
  children: React.ReactNode
}

export default function Desktop({ terminalIconClicking, onTerminalOpen, onIconClick, children }: Props) {
  const [time, setTime]       = useState(() => new Date())
  const [cpu, setCpu]         = useState(12)
  const [ram, setRam]         = useState(61)
  const [uptime, setUptime]   = useState(0)
  const [netIn, setNetIn]     = useState(42)
  const [netOut, setNetOut]   = useState(28)
  const [latency, setLatency] = useState(31)
  const [log, setLog]         = useState<string[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const start = Date.now()
    const iv = setInterval(() => {
      setCpu(Math.floor(7 + Math.random() * 20))
      setRam(Math.floor(58 + Math.random() * 10))
      setUptime(Math.floor((Date.now() - start) / 1000))
      setNetIn(Math.floor(20 + Math.random() * 65))
      setNetOut(Math.floor(10 + Math.random() * 50))
      setLatency(Math.floor(18 + Math.random() * 40))
    }, 2200)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const fmt = () => {
      const n = new Date()
      return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`
    }
    const t0 = setTimeout(() => setLog([`[${fmt()}] Connection established`]), 0)
    const t1 = setTimeout(() => setLog(p => [...p, `[${fmt()}] Guest session active`]), 2000)
    const t2 = setTimeout(() => setLog(p => [...p, `[${fmt()}] Terminal ready`]), 5000)
    const t3 = setTimeout(() => setLog(p => [...p, `[${fmt()}] Firewall ACTIVE`]), 8000)

    let idx = 0
    const iv = setInterval(() => {
      const msg = LOG_PERIODIC[idx % LOG_PERIODIC.length]
      setLog(p => [...p, `[${fmt()}] ${msg}`].slice(-9))
      idx++
    }, 28000)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(iv) }
  }, [])

  const pad        = (n: number) => String(n).padStart(2, '0')
  const clock      = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
  const date       = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const uptimeStr  = `${pad(Math.floor(uptime / 3600))}:${pad(Math.floor((uptime % 3600) / 60))}:${pad(uptime % 60)}`

  const Bar = ({ pct }: { pct: number }) => (
    <span className="desktop-bar">
      <span className="desktop-bar-fill" style={{ width: `${pct}%` }} />
    </span>
  )

  const TrafficBar = ({ pct }: { pct: number }) => {
    const filled = Math.min(8, Math.round(pct / 12.5))
    return (
      <span style={{ color: 'var(--text-dim)', letterSpacing: '1px', fontSize: '0.82em' }}>
        {'█'.repeat(filled)}{'░'.repeat(8 - filled)}
      </span>
    )
  }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: 'var(--bg)', opacity: visible ? 1 : 0, transition: 'opacity 400ms ease' }}
    >
      {/* Top bar */}
      <div className="desktop-topbar">
        <div className="desktop-topbar-left">
          <span className="desktop-os-label">AYBERK_OS</span>
          <span className="desktop-topbar-sep">›</span>
          <span style={{ color: 'var(--text-muted)' }}>v2026.07.04</span>
        </div>
        <div className="desktop-topbar-center">
          <span className="led led-green" />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78em' }}>SYS NOMINAL</span>
          <span className="led led-green" style={{ animationDelay: '0.4s' }} />
        </div>
        <div className="desktop-topbar-right">
          <span style={{ color: 'var(--text-muted)' }}>{date}</span>
          <span className="desktop-topbar-sep">·</span>
          <span style={{ color: 'var(--prompt)', fontWeight: 600 }}>{clock}</span>
        </div>
      </div>

      {/* Desktop body: flex row */}
      <div className="desktop-body">

        {/* Icon column */}
        <aside className="desktop-icon-col">
          {ICONS.map(icon => (
            <button
              key={icon.id}
              className={`desktop-icon${icon.id === 'terminal' && terminalIconClicking ? ' desktop-icon--clicking' : ''}`}
              onClick={() => icon.id === 'terminal' ? onTerminalOpen() : onIconClick(icon.id)}
              aria-label={icon.label}
            >
              <div className="desktop-icon-symbol">{icon.symbol}</div>
              <div className="desktop-icon-label">{icon.label}</div>
            </button>
          ))}
        </aside>

        {/* Terminal window slot */}
        <div className="desktop-main">
          {children}
        </div>

        {/* Right sidebar */}
        <aside className="desktop-sidebar">

          {/* SYS MONITOR */}
          <div className="widget-card">
            <div className="widget-title">SYS MONITOR</div>
            <div className="widget-sep" />
            <div className="widget-row">
              <span className="widget-key">CPU</span>
              <Bar pct={cpu} />
              <span className="widget-val">{cpu}%</span>
            </div>
            <div className="widget-row">
              <span className="widget-key">RAM</span>
              <Bar pct={ram} />
              <span className="widget-val">{ram}%</span>
            </div>
            <div className="widget-sep" />
            <div className="widget-stat"><span className="widget-key">NET</span><span style={{ color: 'var(--success)' }}>ONLINE</span></div>
            <div className="widget-stat"><span className="widget-key">FW</span><span style={{ color: 'var(--success)' }}><span className="led led-green" style={{ marginRight: 4 }} />ACTIVE</span></div>
            <div className="widget-stat"><span className="widget-key">UP</span><span style={{ color: 'var(--text-muted)' }}>{uptimeStr}</span></div>
          </div>

          {/* NETWORK */}
          <div className="widget-card">
            <div className="widget-title">NETWORK</div>
            <div className="widget-sep" />
            <div className="widget-stat">
              <span className="widget-key" style={{ width: 28 }}>IN</span>
              <TrafficBar pct={netIn} />
            </div>
            <div className="widget-stat">
              <span className="widget-key" style={{ width: 28 }}>OUT</span>
              <TrafficBar pct={netOut} />
            </div>
            <div className="widget-sep" />
            <div className="widget-stat">
              <span className="widget-key">LAT</span>
              <span style={{ color: latency < 35 ? 'var(--success)' : 'var(--text-muted)' }}>{latency} ms</span>
            </div>
          </div>

          {/* SERVICES */}
          <div className="widget-card">
            <div className="widget-title">SERVICES</div>
            <div className="widget-sep" />
            {SERVICES.map((s, i) => (
              <div key={s} className="widget-stat" style={{ gap: 6 }}>
                <span className="led led-green" style={{ animationDelay: `${i * 0.3}s`, flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.76em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* GITHUB */}
          <div className="widget-card">
            <div className="widget-title">GITHUB</div>
            <div className="widget-sep" />
            <div style={{ color: 'var(--text-dim)', fontSize: '0.72em', marginBottom: 6 }}>ayberkaydin</div>
            <div className="widget-stat" style={{ gap: 4 }}>
              <span style={{ color: 'var(--prompt)', fontSize: '0.8em', flexShrink: 0 }}>◈</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.76em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>portfolio</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.7em', flexShrink: 0 }}>now</span>
            </div>
            <div className="widget-stat" style={{ gap: 4 }}>
              <span style={{ color: 'var(--prompt)', fontSize: '0.8em', flexShrink: 0 }}>◈</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.76em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>careershipai</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.7em', flexShrink: 0 }}>2d</span>
            </div>
          </div>

          {/* VISITOR LOG */}
          <div className="widget-card" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="widget-title">VISITOR LOG</div>
            <div className="widget-sep" />
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {log.map((entry, i) => (
                <div key={i} style={{ color: 'var(--text-dim)', fontSize: '0.7em', lineHeight: 1.7 }}>
                  {entry}
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}
