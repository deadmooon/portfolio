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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f2f0eb; }

        .cv-wrap {
          background: #f2f0eb;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .cv {
          background: #fff;
          max-width: 760px;
          margin: 0 auto;
          padding: 3rem 3.25rem 3.5rem;
          box-shadow: 0 2px 32px rgba(0,0,0,0.07);
          color: #111;
          font-size: 10.5pt;
          line-height: 1.55;
        }

        /* Header */
        .cv-name {
          text-align: center;
          font-size: 20pt;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .cv-contact {
          text-align: center;
          font-size: 9pt;
          color: #444;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0 0.4rem;
        }
        .cv-contact a { color: #111; text-decoration: none; }
        .cv-contact a:hover { text-decoration: underline; }
        .cv-contact-sep { color: #aaa; }

        /* Divider */
        .cv-rule {
          border: none;
          border-top: 1.5px solid #111;
          margin: 1.25rem 0 0;
        }

        /* Section */
        .cv-section { margin-top: 1.5rem; }
        .cv-section-title {
          font-size: 9.5pt;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-bottom: 1px solid #111;
          padding-bottom: 2px;
          margin-bottom: 0.875rem;
        }

        /* Entry row */
        .cv-entry { margin-bottom: 1.1rem; }
        .cv-entry:last-child { margin-bottom: 0; }

        .cv-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
        }
        .cv-org { font-weight: 700; font-size: 10.5pt; }
        .cv-date { font-size: 9.5pt; color: #444; white-space: nowrap; flex-shrink: 0; }
        .cv-role-line { font-style: italic; font-size: 10pt; color: #222; margin-bottom: 0.3rem; }
        .cv-tagline { font-size: 10pt; color: #222; margin-bottom: 0.25rem; }
        .cv-url { font-size: 9pt; color: #333; font-style: normal; }
        .cv-url a { color: #333; text-decoration: none; }
        .cv-url a:hover { text-decoration: underline; }

        /* Bullets */
        .cv-bullets { padding-left: 1.1rem; margin-top: 0.2rem; }
        .cv-bullets li {
          list-style: disc;
          font-size: 10pt;
          color: #1a1a1a;
          margin-bottom: 0.1rem;
          line-height: 1.5;
        }

        /* Stack */
        .cv-stack {
          font-size: 9pt;
          color: #555;
          margin-bottom: 0.25rem;
          font-style: italic;
        }

        /* Skills */
        .cv-skills-grid { display: flex; flex-direction: column; gap: 0.3rem; }
        .cv-skill-row { display: flex; gap: 0.75rem; font-size: 10pt; line-height: 1.5; }
        .cv-skill-key {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 8.5pt;
          letter-spacing: 0.06em;
          width: 5.5rem;
          flex-shrink: 0;
          padding-top: 2px;
          color: #111;
        }
        .cv-skill-val { color: #222; }

        /* Cert */
        .cv-cert { font-size: 10pt; margin-bottom: 0.25rem; }
        .cv-cert-detail { color: #444; }

        /* Nav */
        .cv-back {
          display: inline-block;
          font-family: 'Georgia', serif;
          font-size: 9pt;
          color: #555;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }
        .cv-back:hover { color: #111; }

        /* Print button */
        .cv-print-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #111;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-family: 'Georgia', serif;
          font-size: 12px;
          font-weight: 700;
          border-radius: 3px;
          cursor: pointer;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        @media (max-width: 600px) {
          .cv { padding: 2rem 1.25rem 2.5rem; }
          .cv-row { flex-direction: column; gap: 0.1rem; }
          .cv-date { text-align: left; }
        }

        @media print {
          body { background: white; }
          .cv-wrap { background: white; padding: 0; }
          .cv { box-shadow: none; padding: 0; max-width: 100%; }
          .cv-back, .cv-print-btn { display: none !important; }
          @page { margin: 1.8cm 2cm; size: A4; }
        }
      `}</style>

      <div className="cv-wrap">
        <div className="cv">
          <a href="/" className="cv-back">← ayberkayd.in</a>

          {/* ── Header ── */}
          <div className="cv-name">{profile.name}</div>
          <div className="cv-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="cv-contact-sep">|</span>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">{profile.linkedin}</a>
            <span className="cv-contact-sep">|</span>
            <a href="https://ayberkayd.in" target="_blank" rel="noreferrer">ayberkayd.in</a>
            <span className="cv-contact-sep">|</span>
            <a href="https://github.com/deadmooon" target="_blank" rel="noreferrer">github.com/deadmooon</a>
          </div>
          <hr className="cv-rule" />

          {/* ── Education ── */}
          <section className="cv-section">
            <div className="cv-section-title">Education</div>
            <div className="cv-entry">
              <div className="cv-row">
                <span className="cv-org">{profile.university}</span>
                <span className="cv-date">{profile.period}</span>
              </div>
              <div className="cv-role-line">B.Sc. {profile.degree}</div>
            </div>
          </section>

          {/* ── Experience ── */}
          <section className="cv-section">
            <div className="cv-section-title">Experience</div>
            {experience.map(exp => (
              <div key={exp.id} className="cv-entry">
                <div className="cv-row">
                  <span className="cv-org">{exp.company}</span>
                  <span className="cv-date">{exp.period}</span>
                </div>
                <div className="cv-role-line">{exp.role} &middot; {exp.location}</div>
                <ul className="cv-bullets">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Projects ── */}
          <section className="cv-section">
            <div className="cv-section-title">Projects</div>
            {projects.map(p => (
              <div key={p.id} className="cv-entry">
                <div className="cv-row">
                  <span className="cv-org">{p.name}</span>
                  {p.url && (
                    <span className="cv-url">
                      <a href={`https://${p.url}`} target="_blank" rel="noreferrer">↗ {p.url}</a>
                    </span>
                  )}
                </div>
                <div className="cv-tagline">{p.tagline}</div>
                <div className="cv-stack">{p.stack.join(' · ')}</div>
                <ul className="cv-bullets">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Skills ── */}
          <section className="cv-section">
            <div className="cv-section-title">Technical Skills</div>
            <div className="cv-skills-grid">
              {Object.entries(skills).map(([k, v]) => (
                <div key={k} className="cv-skill-row">
                  <span className="cv-skill-key">{k}</span>
                  <span className="cv-skill-val">{v.join(' · ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Certifications ── */}
          <section className="cv-section">
            <div className="cv-section-title">Certifications &amp; Achievements</div>
            {certifications.map((c, i) => (
              <div key={i} className="cv-cert">
                <strong>{c.name}</strong>
                <span className="cv-cert-detail"> — {c.detail}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      <PrintButton />
    </>
  )
}
