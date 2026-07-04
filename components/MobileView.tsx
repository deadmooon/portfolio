'use client'

import { useState } from 'react'
import { profile, profileTr, experience, experienceTr, projects, projectsTr, skills, skillsTr } from '@/lib/content'

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
  const [lang, setLang] = useState<'en' | 'tr'>('en')
  const tr  = lang === 'tr'
  const p   = tr ? profileTr    : profile
  const exp = tr ? experienceTr : experience
  const prs = tr ? projectsTr   : projects
  const sk  = tr ? skillsTr     : skills

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.8em' }}>
            AYBERK_OS v2026.07.04 — mobile terminal
          </div>
          <button
            onClick={() => setLang(l => l === 'en' ? 'tr' : 'en')}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--prompt)', fontFamily: 'inherit', fontSize: '0.75em',
              padding: '2px 8px', borderRadius: 3, cursor: 'pointer',
            }}
          >
            {lang === 'en' ? 'TR' : 'EN'}
          </button>
        </div>
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>

      {/* whoami */}
      <Prompt cmd="whoami" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1em' }}>{p.name}</div>
        <div><M>{p.role}</M></div>
        <div><M>{p.university} · {tr ? 'Mezuniyet 2026' : 'Class of 2026'}</M></div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <a href={`mailto:${p.email}`} style={{ color: 'var(--prompt)' }}>{p.email}</a>
          <a href={`https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>{p.linkedin}</a>
        </div>
      </div>

      <Sep />

      {/* skills */}
      <Prompt cmd="cat skills.txt" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
        {Object.entries(sk).map(([k, v]) => (
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
        {exp.map(e => (
          <div key={e.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span style={{ fontWeight: 600 }}>{e.company}</span>
              <M>{e.period}</M>
            </div>
            <div><G>{e.role}</G> <D>· {e.location}</D></div>
            {e.bullets.map((b, i) => (
              <div key={i}><D>  › </D><M>{b}</M></div>
            ))}
          </div>
        ))}
      </div>

      <Sep />

      {/* projects */}
      <Prompt cmd="ls projects/" />
      <div style={{ paddingLeft: '0.5rem', marginBottom: '1.25rem' }}>
        {prs.map(pr => (
          <div key={pr.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span style={{ fontWeight: 700 }}>{pr.name}</span>
              <M>{pr.tagline}</M>
            </div>
            {pr.url && (
              <a href={`https://${pr.url}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>↗ {pr.url}</a>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
              {pr.stack.map(s => (
                <span key={s} style={{
                  background: 'var(--bg-surface)', color: 'var(--text-muted)',
                  border: '1px solid var(--border)', borderRadius: 3,
                  padding: '1px 6px', fontSize: '0.75em'
                }}>{s}</span>
              ))}
            </div>
            <div style={{ marginTop: '0.25rem' }}><M>{pr.bullets[0]}</M></div>
          </div>
        ))}
      </div>

      <Sep />

      {/* contact */}
      <Prompt cmd="cat contact.txt" />
      <div style={{ paddingLeft: '0.5rem' }}>
        <div><D>email     </D><a href={`mailto:${p.email}`} style={{ color: 'var(--prompt)' }}>{p.email}</a></div>
        <div><D>linkedin  </D><a href={`https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--prompt)' }}>{p.linkedin}</a></div>
        <div><D>domain    </D><M>ayberkayd.in</M></div>
      </div>

      <div style={{ marginTop: '2rem', color: 'var(--text-dim)', fontSize: '0.78em', textAlign: 'center' }}>
        {tr ? 'masaüstünde daha iyi bir deneyim mevcut ↗' : 'desktop için daha iyi bir deneyim mevcut ↗'}
      </div>
    </div>
  )
}
