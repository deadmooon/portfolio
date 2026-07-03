'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { profile, experience, projects, skills, certifications, lsOutput, lsOutputAll, helpText } from '@/lib/content'
// ponytail: certifications used in cat certs.txt command output below

const HANDLE = 'guest@ayberk:~$'

type OutputLine = { id: string; content: React.ReactNode }



// ─── Shared primitives ────────────────────────────────────────

const Sep = () => <div style={{ color: 'var(--text-dim)' }}>{'─'.repeat(48)}</div>

const Dim = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--text-dim)' }}>{children}</span>
)
const Muted = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{ color: 'var(--text-muted)', ...style }}>{children}</span>
)
const Green = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--prompt)' }}>{children}</span>
)

// ─── Command handler ───────────────────────────────────────────

interface RunCtx {
  history?: string[]
  sessionStart?: number
  rawInput?: string   // original casing for echo
}

const MAN_PAGES: Record<string, { synopsis: string; desc: string }> = {
  ls:       { synopsis: 'ls [path]',       desc: 'List files and directories in the given path (default: /home/guest).' },
  cat:      { synopsis: 'cat <path>',      desc: 'Print the contents of a file to the terminal.' },
  whoami:   { synopsis: 'whoami',          desc: 'Show info about the current user and start a guided CV walkthrough.' },
  pwd:      { synopsis: 'pwd',             desc: 'Print the current working directory.' },
  tree:     { synopsis: 'tree',            desc: 'Display the full directory tree rooted at /home/guest.' },
  history:  { synopsis: 'history',         desc: 'List all commands entered in this session, oldest first.' },
  uptime:   { synopsis: 'uptime',          desc: 'Show how long the current terminal session has been running.' },
  date:     { synopsis: 'date',            desc: 'Print the current local date and time.' },
  echo:     { synopsis: 'echo <text>',     desc: 'Write text to the terminal.' },
  open:     { synopsis: 'open <url>',      desc: 'Open a URL in a new browser tab.' },
  clear:    { synopsis: 'clear',           desc: 'Clear all output from the terminal.' },
  help:     { synopsis: 'help',            desc: 'List available commands.' },
  man:      { synopsis: 'man <command>',   desc: 'Display the manual page for a command.' },
  neofetch: { synopsis: 'neofetch',        desc: 'Display system information and an ASCII logo.' },
  ask:      { synopsis: 'ask <question>',  desc: 'Ask a natural-language question about the portfolio owner.' },
  ping:     { synopsis: 'ping <host>',     desc: 'Send ICMP packets to a host and report round-trip time.' },
  hack:     { synopsis: 'hack <target>',   desc: 'Attempt unauthorized access. Results vary.' },
}

function runCommand(raw: string, onGlitch: () => void, ctx: RunCtx = {}): React.ReactNode {
  const parts = raw.trim().split(/\s+/)
  const cmd   = parts[0].toLowerCase()
  const args  = parts.slice(1).map(a => a.toLowerCase())
  const arg   = args.join(' ')
  // preserve original casing for echo
  const rawArg = raw.trim().split(/\s+/).slice(1).join(' ')

  switch (cmd) {
    case 'whoami':
      return (
        <div className="space-y-1">
          <Sep />
          <div className="pl-2 space-y-0.5">
            <div style={{ fontSize: '1.05em', fontWeight: 700 }}>{profile.name}</div>
            <div><Muted>{profile.role}</Muted></div>
            <div><Muted>{profile.university} · Class of 2026</Muted></div>
            <div className="flex gap-6 flex-wrap pt-1">
              <a href={`mailto:${profile.email}`} className="hover:underline"><Green>{profile.email}</Green></a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline"><Green>{profile.linkedin}</Green></a>
            </div>
          </div>
          <Sep />
        </div>
      )

    case 'ls': {
      const flags   = args.filter(a => a.startsWith('-'))
      const pathArg = args.find(a => !a.startsWith('-')) ?? ''
      const showAll = flags.some(f => f.includes('a'))

      if (!pathArg || pathArg === '.' || pathArg === '~')
        return <div style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>{showAll ? lsOutputAll : lsOutput}</div>
      if (pathArg === 'experience/' || pathArg === 'experience')
        return <Muted>{experience.map(e => e.id + '.txt').join('   ')}</Muted>
      if (pathArg === 'projects/' || pathArg === 'projects')
        return <Muted>{projects.map(p => p.id + '/').join('   ')}</Muted>
      if (pathArg === 'downloads/' || pathArg === 'downloads')
        return <Muted>ayberk_cv.pdf   README.txt</Muted>
      if (pathArg === 'logs/' || pathArg === 'logs')
        return <Muted>access.log   session.log</Muted>
      if (pathArg.startsWith('.'))
        return <div style={{ color: 'var(--error)' }}>ls: {pathArg}: Permission denied</div>
      return <div style={{ color: 'var(--error)' }}>ls: {pathArg}: No such file or directory</div>
    }

    case 'cat': {
      if (!arg) return <Muted>Usage: cat &lt;path&gt;</Muted>

      if (/^\.(env|config|git|ssh)|^logs\//.test(arg))
        return <div style={{ color: 'var(--error)' }}>cat: {arg}: Permission denied</div>

      if (arg === 'downloads/ayberk_cv.pdf')
        return (
          <div className="space-y-0.5">
            <Muted>Binary file — PDF · cannot display in terminal.</Muted>
            <Muted>Download at: <Green><a href="https://ayberkayd.in/cv" target="_blank" rel="noreferrer" className="hover:underline">ayberkayd.in/cv</a></Green></Muted>
          </div>
        )

      if (arg === 'downloads/readme.txt' || arg === 'downloads/readme')
        return <Muted>CV and assets available at ayberkayd.in.</Muted>

      if (arg === 'about.txt' || arg === 'about')
        return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-1 space-y-0.5">
              <div style={{ fontWeight: 700 }}>{profile.name}</div>
              <div><Muted>{profile.role}</Muted></div>
              <div><Muted>{profile.university} · Computer Engineering · 2021–2026</Muted></div>
            </div>
            <Sep />
          </div>
        )

      if (arg === 'experience/readme.md' || arg === 'experience.txt') {
        return (
          <div className="space-y-1">
            <Sep />
            {experience.map((exp) => (
              <div key={exp.id} className="pl-2 py-2 space-y-0.5">
                <div className="flex justify-between flex-wrap gap-2">
                  <span style={{ fontWeight: 600 }}>{exp.company}</span>
                  <Muted>{exp.period}</Muted>
                </div>
                <div><Green>{exp.role}</Green> <Dim>· {exp.location}</Dim></div>
                {exp.bullets.map((b, i) => (
                  <div key={i}><Dim>  › </Dim><Muted>{b}</Muted></div>
                ))}
              </div>
            ))}
            <Sep />
          </div>
        )
      }

      if (arg.startsWith('projects/') || arg.startsWith('experience/')) {
        const projId = arg.replace('projects/', '').replace('/readme.md', '').replace('.txt', '')
        const proj = projects.find(p => p.id === projId)
        if (proj) return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-2 space-y-1">
              <div className="flex justify-between flex-wrap gap-2">
                <span style={{ fontWeight: 700 }}>{proj.name}</span>
                <Muted>{proj.tagline}</Muted>
              </div>
              {proj.url && (
                <a href={`https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline">
                  <Green>↗ {proj.url}</Green>
                </a>
              )}
              <div className="flex flex-wrap gap-1.5 py-0.5">
                {proj.stack.map(s => (
                  <span key={s} className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                    {s}
                  </span>
                ))}
              </div>
              {proj.bullets.map((b, i) => (
                <div key={i}><Dim>  › </Dim><Muted>{b}</Muted></div>
              ))}
            </div>
            <Sep />
          </div>
        )
        const expId = arg.replace('experience/', '').replace('.txt', '')
        const exp = experience.find(e => e.id === expId)
        if (exp) return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-2 space-y-0.5">
              <div className="flex justify-between flex-wrap gap-2">
                <span style={{ fontWeight: 600 }}>{exp.company}</span>
                <Muted>{exp.period}</Muted>
              </div>
              <div><Green>{exp.role}</Green> <Dim>· {exp.location}</Dim></div>
              {exp.bullets.map((b, i) => (
                <div key={i}><Dim>  › </Dim><Muted>{b}</Muted></div>
              ))}
            </div>
            <Sep />
          </div>
        )
        return <div style={{ color: 'var(--error)' }}>cat: {arg}: No such file or directory</div>
      }

      if (arg === 'skills.txt' || arg === 'skills')
        return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-1 space-y-1">
              {Object.entries(skills).map(([k, v]) => (
                <div key={k} className="flex gap-4 flex-wrap">
                  <span className="w-24 shrink-0 uppercase text-xs"><Dim>{k}</Dim></span>
                  <Muted>{v.join(' · ')}</Muted>
                </div>
              ))}
            </div>
            <Sep />
          </div>
        )

      if (arg === 'certs.txt' || arg === 'certs')
        return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-1 space-y-0.5">
              {certifications.map((c, i) => (
                <div key={i}><Green>{c.name}</Green> <Muted>— {c.detail}</Muted></div>
              ))}
            </div>
            <Sep />
          </div>
        )

      if (arg === 'contact.txt' || arg === 'contact')
        return (
          <div className="space-y-1">
            <Sep />
            <div className="pl-2 py-1 space-y-0.5">
              <div><Dim>email     </Dim><a href={`mailto:${profile.email}`} className="hover:underline"><Green>{profile.email}</Green></a></div>
              <div><Dim>linkedin  </Dim><a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline"><Green>{profile.linkedin}</Green></a></div>
              <div><Dim>domain    </Dim>ayberkayd.in</div>
            </div>
            <Sep />
          </div>
        )

      return <div style={{ color: 'var(--error)' }}>cat: {arg}: No such file or directory</div>
    }

    case 'cd':
      return <Muted>(filesystem is read-only in this shell)</Muted>

    case 'open': {
      const url = args[0]
      if (!url) return <div style={{ color: 'var(--error)' }}>open: missing argument</div>
      const full = url.startsWith('http') ? url : `https://${url}`
      window.open(full, '_blank', 'noreferrer')
      return <Muted>opening {url}...</Muted>
    }

    case 'sudo': {
      onGlitch()
      if (arg.startsWith('rm')) {
        return (
          <div className="space-y-0.5">
            <div style={{ color: 'var(--error)' }}>Permission denied.</div>
            <Muted>System integrity is protected. Nice try.</Muted>
          </div>
        )
      }
      return (
        <div>
          <div style={{ color: 'var(--error)' }}>sudo: Permission denied</div>
          <Muted>nice try though.</Muted>
        </div>
      )
    }

    case 'su':
    case 'root':
      onGlitch()
      return (
        <div>
          <div style={{ color: 'var(--error)' }}>{cmd}: Permission denied</div>
          <Muted>nice try though.</Muted>
        </div>
      )

    case 'hack': {
      const knownTargets = ['nasa', 'cia', 'nsa', 'pentagon', 'fbi', 'mit', 'google', 'apple', 'microsoft', 'fbi']
      if (knownTargets.some(t => arg.includes(t))) {
        return (
          <div className="space-y-0.5">
            <div style={{ color: 'var(--error)' }}>ACCESS DENIED</div>
            <Muted>Nice try :)</Muted>
          </div>
        )
      }
      return (
        <div>
          <Green>initiating hack sequence...</Green>
          <div><Muted>jk. that&apos;s not how any of this works.</Muted></div>
        </div>
      )
    }

    case 'shutdown':
    case 'reboot':
    case 'poweroff':
    case 'halt':
      return (
        <div className="space-y-0.5">
          <Dim>── Shutdown request received ──</Dim>
          <div style={{ color: 'var(--error)' }}>Blocked: Active visitor session detected.</div>
          <Muted>Cannot shut down while guests are connected.</Muted>
        </div>
      )

    case 'make':
      if (arg === 'coffee') {
        return (
          <div className="space-y-0.5">
            <div style={{ color: 'var(--error)' }}>Error: coffee module not installed</div>
            <Muted>Try: brew install coffee <Dim>(requires a kitchen)</Dim></Muted>
          </div>
        )
      }
      return <div style={{ color: 'var(--error)' }}>make: {arg || '???'}: No rule to make target</div>

    case 'vim':
    case 'nano':
    case 'emacs':
      return <Muted>{cmd}: not found — this terminal runs on vibes, not editors.</Muted>

    case 'exit':
    case 'logout':
      return (
        <div className="space-y-0.5">
          <Muted>Logout blocked: guest sessions cannot be closed from the client.</Muted>
          <Muted>Type <Green>help</Green> to see available commands.</Muted>
        </div>
      )

    case 'ping': {
      if (!arg) return <Muted>Usage: ping &lt;host&gt;</Muted>
      return (
        <div className="space-y-0.5">
          <Muted>PING {arg}: 56 data bytes</Muted>
          <Muted>64 bytes from {arg}: icmp_seq=0 ttl=64 time={18 + Math.floor(Math.random() * 25)}.{Math.floor(Math.random() * 9)} ms</Muted>
          <Muted>64 bytes from {arg}: icmp_seq=1 ttl=64 time={18 + Math.floor(Math.random() * 25)}.{Math.floor(Math.random() * 9)} ms</Muted>
          <Dim>--- {arg} ping statistics ---</Dim>
          <Muted>2 packets transmitted, 2 received, 0% packet loss</Muted>
        </div>
      )
    }

    case 'ask': {
      if (!arg) {
        return (
          <div className="space-y-0.5">
            <Muted>Usage: ask &lt;question&gt;</Muted>
            <Muted>Example: <Green>ask about projects</Green></Muted>
          </div>
        )
      }
      const q = arg.toLowerCase()

      if (/project|built|made|created|ship/.test(q)) {
        return (
          <div className="space-y-2 pl-2">
            <Green>Projects</Green>
            {projects.map(p => (
              <div key={p.id} className="space-y-0.5">
                <div style={{ fontWeight: 600 }}>{p.name} <Dim>— {p.tagline}</Dim></div>
                <Muted>{p.bullets[0]}</Muted>
                {p.url && <div><Green>↗ {p.url}</Green></div>}
              </div>
            ))}
          </div>
        )
      }

      if (/experience|work|job|intern|compan|employ/.test(q)) {
        return (
          <div className="space-y-2 pl-2">
            <Green>Experience</Green>
            {experience.map(e => (
              <div key={e.id} className="space-y-0.5">
                <div style={{ fontWeight: 600 }}>{e.company}</div>
                <Muted>{e.role} · {e.period}</Muted>
              </div>
            ))}
          </div>
        )
      }

      if (/skill|tech|stack|language|tool|use/.test(q)) {
        return (
          <div className="pl-2 space-y-1">
            <Green>Skills</Green>
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="flex gap-4 flex-wrap">
                <span className="w-20 shrink-0 uppercase text-xs"><Dim>{k}</Dim></span>
                <Muted>{v.join(' · ')}</Muted>
              </div>
            ))}
          </div>
        )
      }

      if (/contact|email|reach|hire|linkedin/.test(q)) {
        return (
          <div className="pl-2 space-y-0.5">
            <Green>Contact</Green>
            <div><Dim>email     </Dim><a href={`mailto:${profile.email}`} className="hover:underline"><Green>{profile.email}</Green></a></div>
            <div><Dim>linkedin  </Dim><a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline"><Green>{profile.linkedin}</Green></a></div>
          </div>
        )
      }

      if (/who|about|yourself|you are|identity/.test(q)) {
        return (
          <div className="pl-2 space-y-1">
            <div style={{ fontWeight: 600 }}>{profile.name}</div>
            <Muted>{profile.role}</Muted>
            <Muted>{profile.university} · Class of 2026</Muted>
            <div className="pt-1"><Muted>Type <Green>whoami</Green> for a guided CV walkthrough.</Muted></div>
          </div>
        )
      }

      return (
        <div className="pl-2 space-y-1">
          <Muted>Hmm, not sure what you mean. Try:</Muted>
          <Muted><Green>ask about projects</Green> · <Green>ask skills</Green> · <Green>ask experience</Green> · <Green>ask contact</Green></Muted>
        </div>
      )
    }

    case 'pwd':
      return <Muted>/home/guest</Muted>

    case 'tree':
      return (
        <pre style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9em' }}>{`/home/guest
├── about.txt
├── skills.txt
├── certs.txt
├── contact.txt
├── experience/
│   ├── README.md
│   ├── bilisim.txt
│   └── estu-it.txt
├── projects/
│   ├── careershipai/
│   │   └── README.md
│   └── bug-bounty/
│       └── [CLASSIFIED]
├── downloads/
│   └── ayberk_cv.pdf
└── logs/
    ├── access.log [protected]
    └── session.log [protected]`}</pre>
      )

    case 'history': {
      const hist = ctx.history ?? []
      if (hist.length === 0) return <Muted>No commands in history.</Muted>
      const listed = [...hist].reverse()
      return (
        <div className="space-y-0.5">
          {listed.map((h, i) => (
            <div key={i} className="flex gap-4">
              <Dim>{String(i + 1).padStart(3, ' ')}</Dim>
              <Muted>{h}</Muted>
            </div>
          ))}
        </div>
      )
    }

    case 'uptime': {
      const elapsed = ctx.sessionStart ? Math.floor((Date.now() - ctx.sessionStart) / 1000) : 0
      const pad = (n: number) => String(n).padStart(2, '0')
      const hh = Math.floor(elapsed / 3600)
      const mm = Math.floor((elapsed % 3600) / 60)
      const ss = elapsed % 60
      return (
        <div className="space-y-0.5">
          <Muted>Session uptime: <Green>{pad(hh)}:{pad(mm)}:{pad(ss)}</Green></Muted>
          <Muted>Terminal session active at <Green>guest@ayberk</Green></Muted>
        </div>
      )
    }

    case 'date': {
      const now = new Date()
      return (
        <Muted>{now.toLocaleString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long',
          day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
        })}</Muted>
      )
    }

    case 'echo':
      return rawArg ? <Muted>{rawArg}</Muted> : null

    case 'man': {
      if (!arg) return (
        <div className="space-y-0.5">
          <Muted>Usage: man &lt;command&gt;</Muted>
          <Muted>Try: <Green>man ls</Green> · <Green>man cat</Green> · <Green>man whoami</Green></Muted>
        </div>
      )
      const page = MAN_PAGES[arg]
      if (!page) return <div style={{ color: 'var(--error)' }}>man: no entry for {arg}</div>
      return (
        <div className="space-y-2 pl-2">
          <div><Dim>NAME</Dim></div>
          <div className="pl-4"><Green>{arg}</Green> — {page.desc}</div>
          <div><Dim>SYNOPSIS</Dim></div>
          <div className="pl-4"><Muted>{page.synopsis}</Muted></div>
        </div>
      )
    }

    case 'neofetch': {
      const elapsed = ctx.sessionStart ? Math.floor((Date.now() - ctx.sessionStart) / 1000) : 0
      const pad = (n: number) => String(n).padStart(2, '0')
      const hh = Math.floor(elapsed / 3600)
      const mm = Math.floor((elapsed % 3600) / 60)
      const ss = elapsed % 60
      const info: [string, React.ReactNode][] = [
        ['OS',      <><Green key="os">AYBERK_OS</Green> v2026.07.04</>],
        ['Host',    'ayberkayd.in'],
        ['Shell',   'ayberksh 2.0'],
        ['Kernel',  'next.js 16.2.10'],
        ['Uptime',  `${pad(hh)}:${pad(mm)}:${pad(ss)}`],
        ['Tech',    'Next.js · TypeScript · Tailwind'],
        ['Theme',   'Hack Green / Terminal Black'],
      ]
      const logo = `  ┌─────────────────┐
  │  > _            │
  │                 │
  │   AYBERK_OS     │
  └─────────────────┘`
      return (
        <div className="flex gap-8">
          <pre style={{ color: 'var(--prompt)', flexShrink: 0, lineHeight: 1.7 }}>{logo}</pre>
          <div className="space-y-0.5 pt-1">
            <div><Green>guest</Green><Dim>@</Dim><Green>ayberk</Green></div>
            <Sep />
            {info.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <span style={{ color: 'var(--prompt)', fontWeight: 600, width: '4rem', flexShrink: 0 }}>{k}</span>
                <Muted>{v}</Muted>
              </div>
            ))}
          </div>
        </div>
      )
    }

    case 'clear':
      return null

    case 'help':
      return <pre style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>{helpText}</pre>

    case '':
      return null

    default:
      return (
        <div>
          <span style={{ color: 'var(--error)' }}>command not found: {cmd}</span>
          <Muted> — try &apos;help&apos;</Muted>
        </div>
      )
  }
}

// ─── Main component ────────────────────────────────────────────

interface Props {
  onGlitch: () => void
  externalCmd?: string | null
  onExternalCmdConsumed?: () => void
  onScroll?: () => void
}

const WHOAMI_SEQUENCE = [
  'cat experience/README.md',
  'cat projects/careershipai/README.md',
  'cat skills.txt',
  'cat certs.txt',
  'cat contact.txt',
]

export default function TerminalSession({ onGlitch, externalCmd, onExternalCmdConsumed, onScroll }: Props) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [outputs, setOutputs] = useState<OutputLine[]>([])
  const [sequencing, setSequencing] = useState(false)
  const [seqTyping, setSeqTyping] = useState('')   // command being typed in sequence
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionStartRef = useRef(Date.now())

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    if (!externalCmd) return
    const id = `ext-${Date.now()}`
    const output = runCommand(externalCmd, onGlitch, { history, sessionStart: sessionStartRef.current })
    setOutputs(prev => [
      ...prev,
      {
        id,
        content: (
          <div>
            <div className="flex gap-3 mt-4">
              <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
              <span>{externalCmd}</span>
            </div>
            {output && <div className="mt-1">{output}</div>}
          </div>
        ),
      },
    ])
    onExternalCmdConsumed?.()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCmd, onGlitch, onExternalCmdConsumed])

  const runSequence = useCallback((cmds: string[], afterId: string) => {
    setSequencing(true)
    let cancelled = false

    const next = (idx: number) => {
      if (cancelled || idx >= cmds.length) {
        if (!cancelled) setSequencing(false)
        return
      }
      const cmd = cmds[idx]
      let charIdx = 0
      setSeqTyping('')

      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return }
        charIdx++
        setSeqTyping(cmd.slice(0, charIdx))
        if (charIdx === cmd.length) {
          clearInterval(iv)
          setTimeout(() => {
            if (cancelled) return
            const output = runCommand(cmd, onGlitch, { sessionStart: sessionStartRef.current })
            setOutputs(prev => [
              ...prev,
              {
                id: `${afterId}-seq-${idx}`,
                content: (
                  <div>
                    <div className="flex gap-3 mt-4">
                      <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
                      <span>{cmd}</span>
                    </div>
                    {output && <div className="mt-1">{output}</div>}
                  </div>
                ),
              },
            ])
            setSeqTyping('')
            setTimeout(() => next(idx + 1), 400)
          }, 250)
        }
      }, 38)
    }

    next(0)
    return () => { cancelled = true }
  }, [onGlitch])

  useEffect(() => { onScroll?.() }, [outputs, seqTyping, onScroll])

  const submit = useCallback(() => {
    const raw = input.trim()
    if (!raw) return

    if (raw.toLowerCase() === 'clear') {
      setOutputs([])
      setInput('')
      setHistory(h => [raw, ...h])
      setHistIdx(-1)
      return
    }

    const id = `${Date.now()}`

    if (raw.toLowerCase() === 'whoami') {
      // show whoami line + brief header, then auto-run sequence
      const header = runCommand('whoami', onGlitch, { history, sessionStart: sessionStartRef.current })
      setOutputs(prev => [
        ...prev,
        {
          id,
          content: (
            <div>
              <div className="flex gap-3 mt-4">
                <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
                <span>{raw}</span>
              </div>
              {header && <div className="mt-1">{header}</div>}
            </div>
          ),
        },
      ])
      setHistory(h => [raw, ...h])
      setHistIdx(-1)
      setInput('')
      setTimeout(() => runSequence(WHOAMI_SEQUENCE, id), 300)
      return
    }

    const output = runCommand(raw, onGlitch, { history, sessionStart: sessionStartRef.current })
    setOutputs(prev => [
      ...prev,
      {
        id,
        content: (
          <div>
            <div className="flex gap-3 mt-4">
              <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
              <span>{raw}</span>
            </div>
            {output && <div className="mt-1">{output}</div>}
          </div>
        ),
      },
    ])

    setHistory(h => [raw, ...h])
    setHistIdx(-1)
    setInput('')
  }, [input, history, onGlitch, runSequence])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next] ?? '')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-8 py-16 max-w-3xl mx-auto w-full">
        {outputs.length === 0 && !sequencing && (
          <div style={{ color: 'var(--text-dim)' }} className="space-y-1">
            <div>type <span style={{ color: 'var(--text-muted)' }}>help</span> for available commands</div>
            <div style={{ color: 'var(--text-dim)', opacity: 0.6 }}>tip: type <span style={{ color: 'var(--text-muted)' }}>whoami</span> to see everything</div>
          </div>
        )}
        {outputs.map(o => <div key={o.id}>{o.content}</div>)}
        {sequencing && seqTyping && (
          <div className="flex gap-3 mt-4">
            <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
            <span>{seqTyping}<span className="cursor" /></span>
          </div>
        )}
      </div>

      <div
        className="sticky bottom-0 px-8 py-4 max-w-3xl mx-auto w-full"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
        onClick={() => !sequencing && inputRef.current?.focus()}
      >
        <div className="flex gap-3 items-center">
          <span style={{ color: 'var(--prompt)', flexShrink: 0 }}>{HANDLE}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={sequencing ? '' : input}
            onChange={e => !sequencing && setInput(e.target.value)}
            onKeyDown={sequencing ? undefined : handleKeyDown}
            disabled={sequencing}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command input"
            style={{ opacity: sequencing ? 0.3 : 1 }}
          />
        </div>
      </div>
    </div>
  )
}
