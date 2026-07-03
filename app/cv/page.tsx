import type { Metadata } from 'next'
import { profile, experience, projects, skills, certifications } from '@/lib/content'
import PrintButton from './PrintButton'

export const metadata: Metadata = {
  title: 'CV — Ayberk Aydın',
  description: 'Curriculum Vitae of Ayberk Aydın — Computer Engineer, Security Researcher, Builder',
}

export default function CV() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060608; }
        .cv { background: #060608; color: #b8ffdc; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.75; max-width: 780px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .cv-header { border-bottom: 1px solid #182a1e; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .cv-name { font-size: 2rem; font-weight: 700; color: #39ff88; letter-spacing: -0.5px; margin-bottom: 0.25rem; }
        .cv-role { color: #4a6b55; font-size: 0.9em; margin-bottom: 0.75rem; }
        .cv-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .cv-links a { color: #39ff88; text-decoration: none; font-size: 0.85em; }
        .cv-links a:hover { text-decoration: underline; }
        .cv-section { margin-bottom: 2.25rem; }
        .cv-section-title { color: #4a6b55; font-size: 0.75em; letter-spacing: 0.12em; text-transform: uppercase; border-bottom: 1px solid #182a1e; padding-bottom: 4px; margin-bottom: 1rem; }
        .cv-entry { margin-bottom: 1.25rem; }
        .cv-entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.125rem; }
        .cv-entry-title { font-weight: 600; }
        .cv-entry-date { color: #4a6b55; font-size: 0.85em; }
        .cv-entry-sub { color: #39ff88; font-size: 0.9em; margin-bottom: 0.25rem; }
        .cv-bullet { display: flex; gap: 0.75rem; color: #4a6b55; font-size: 0.9em; margin-bottom: 0.125rem; }
        .cv-bullet::before { content: '›'; color: #2a3d30; flex-shrink: 0; }
        .cv-skills { display: flex; flex-direction: column; gap: 0.375rem; }
        .cv-skill-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .cv-skill-key { color: #2a3d30; text-transform: uppercase; font-size: 0.75em; width: 5rem; flex-shrink: 0; padding-top: 2px; }
        .cv-skill-val { color: #4a6b55; font-size: 0.9em; }
        .cv-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.375rem; }
        .cv-tag { background: #0d100e; border: 1px solid #182a1e; border-radius: 3px; padding: 1px 7px; font-size: 0.78em; color: #4a6b55; }
        .cv-print-btn { position: fixed; bottom: 2rem; right: 2rem; background: #39ff88; color: #060608; border: none; padding: 10px 20px; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; border-radius: 4px; cursor: pointer; letter-spacing: 0.04em; }
        .cv-back { display: inline-block; color: #4a6b55; font-size: 0.85em; margin-bottom: 2rem; text-decoration: none; }
        .cv-back:hover { color: #39ff88; }
        @media print {
          body { background: white; }
          .cv { background: white; color: #111; padding: 1.5rem 1.5rem 2rem; max-width: 100%; }
          .cv-name { color: #111; }
          .cv-role, .cv-section-title, .cv-entry-date, .cv-skill-key, .cv-bullet { color: #555; }
          .cv-entry-sub, .cv-links a { color: #0a6e3f; }
          .cv-section-title { border-color: #ddd; }
          .cv-tag { background: #f5f5f5; border-color: #ddd; color: #555; }
          .cv-print-btn, .cv-back { display: none; }
          .cv-bullet::before { color: #aaa; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div className="cv">
        <a href="/" className="cv-back">← ayberkayd.in</a>

        <div className="cv-header">
          <div className="cv-name">{profile.name}</div>
          <div className="cv-role">{profile.role}</div>
          <div className="cv-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">{profile.linkedin}</a>
            <a href="https://ayberkayd.in" target="_blank" rel="noreferrer">ayberkayd.in</a>
            <a href="https://github.com/deadmooon" target="_blank" rel="noreferrer">github.com/deadmooon</a>
          </div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Education</div>
          <div className="cv-entry">
            <div className="cv-entry-header">
              <span className="cv-entry-title">{profile.university}</span>
              <span className="cv-entry-date">{profile.period}</span>
            </div>
            <div className="cv-entry-sub">{profile.degree}</div>
          </div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Experience</div>
          {experience.map(exp => (
            <div key={exp.id} className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-title">{exp.company}</span>
                <span className="cv-entry-date">{exp.period}</span>
              </div>
              <div className="cv-entry-sub">{exp.role} · {exp.location}</div>
              {exp.bullets.map((b, i) => (
                <div key={i} className="cv-bullet">{b}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Projects</div>
          {projects.map(p => (
            <div key={p.id} className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-title">{p.name}</span>
                {p.url && <a href={`https://${p.url}`} target="_blank" rel="noreferrer" style={{ color: '#39ff88', fontSize: '0.85em' }}>↗ {p.url}</a>}
              </div>
              <div className="cv-entry-sub">{p.tagline}</div>
              {p.bullets.map((b, i) => (
                <div key={i} className="cv-bullet">{b}</div>
              ))}
              <div className="cv-tags">
                {p.stack.map(s => <span key={s} className="cv-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Skills</div>
          <div className="cv-skills">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="cv-skill-row">
                <span className="cv-skill-key">{k}</span>
                <span className="cv-skill-val">{v.join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Certifications & Achievements</div>
          {certifications.map((c, i) => (
            <div key={i} className="cv-entry" style={{ marginBottom: '0.5rem' }}>
              <span className="cv-entry-title">{c.name}</span>
              <span style={{ color: '#4a6b55', marginLeft: '0.75rem', fontSize: '0.9em' }}>— {c.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <PrintButton />
    </>
  )
}
