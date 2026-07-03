'use client'

import { profile, experience, projects, skills, writeups } from '@/lib/content'

const G = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--prompt)' }}>{children}</span>
)
const D = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--text-dim)' }}>{children}</span>
)
const M = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--text-muted)' }}>{children}</span>
)
const Sep = () => <div style={{ borderTop: '1px solid var(--border)', margin: '1.25rem 0' }} />
const Prompt = ({ cmd }: { cmd: string }) => (
  <div style={{ marginBottom: '0.5rem' }}>
    <G>guest@ayberk</G><D>:~$ </D><span>{cmd}</span>
  </div>
)

export default function MobileView() {
  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100dvh',
      fontFamily: 'var(--font-jetbrains), monospace',
      fontSize: '13px',
      lineHeight: 1.75,
      padding: '1.25rem 1rem 3rem',
      overflowX: 'hidden',
    }}>

      {/* header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.8em', marginBottom: '0.5rem' }}>
          AYBERK_OS v2026.07.04 — mobile terminal
        </div>
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* whoami */}
      <Prompt cmd="whoami" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1em' }}>{profile.name}</div>
        <div><M>{profile.role}</M></div>
        <div><M>{profile.university} · Class of 2026</M></div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <a href={`mailto:${profile.email}`} style={{ color: 'var(--prompt)' }}>{profile.email}</a>
          <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>{profile.linkedin}</a>
        </div>
      </div>

      <Sep />

      {/* skills */}
      <Prompt cmd="cat skills.txt" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
        {Object.entries(skills).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-dim)', width: '5rem', flexShrink: 0, textTransform: 'uppercase', fontSize: '0.78em' }}>{k}</span>
            <M>{v.join(' · ')}</M>
          </div>
        ))}
      </div>

      <Sep />

      {/* experience */}
      <Prompt cmd="cat experience/README.md" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
        {experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span style={{ fontWeight: 600 }}>{exp.company}</span>
              <M>{exp.period}</M>
            </div>
            <div><G>{exp.role}</G> <D>· {exp.location}</D></div>
            {exp.bullets.map((b, i) => (
              <div key={i}><D>  › </D><M>{b}</M></div>
            ))}
          </div>
        ))}
      </div>

      <Sep />

      {/* projects */}
      <Prompt cmd="ls projects/" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.25rem' }}>
        {projects.map(p => (
          <div key={p.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span style={{ fontWeight: 700 }}>{p.name}</span>
              <M>{p.tagline}</M>
            </div>
            {p.url && (
              <a href={`https://${p.url}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>↗ {p.url}</a>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
              {p.stack.map(s => (
                <span key={s} style={{
                  background: 'var(--bg-surface)', color: 'var(--text-muted)',
                  border: '1px solid var(--border)', borderRadius: 3,
                  padding: '1px 6px', fontSize: '0.75em'
                }}>{s}</span>
              ))}
            </div>
            <div style={{ marginTop: '0.25rem' }}><M>{p.bullets[0]}</M></div>
          </div>
        ))}
      </div>

      <Sep />

      {/* writeups */}
      <Prompt cmd="ls writeups/" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.25rem' }}>
        {writeups.map(w => {
          const c = w.severity === 'HIGH' ? 'var(--error)' : '#f5a623'
          return (
            <div key={w.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600 }}>{w.title}</span>
                <span style={{ color: c, border: `1px solid ${c}`, padding: '0px 5px', borderRadius: 3, fontSize: '0.75em' }}>{w.severity}</span>
              </div>
              <M>{w.summary.slice(0, 100)}…</M>
            </div>
          )
        })}
      </div>

      <Sep />

      {/* contact */}
      <Prompt cmd="cat contact.txt" />
      <div style={{ paddingLeft: '0.5rem' }}>
        <div><D>email     </D><a href={`mailto:${profile.email}`} style={{ color: 'var(--prompt)' }}>{profile.email}</a></div>
        <div><D>linkedin  </D><a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>{profile.linkedin}</a></div>
        <div><D>domain    </D><M>ayberkayd.in</M></div>
      </div>

      <div style={{ marginTop: '2rem', color: 'var(--text-dim)', fontSize: '0.78em', textAlign: 'center' }}>
        desktop için daha iyi bir deneyim mevcut ↗
      </div>
    </div>
  )
}
