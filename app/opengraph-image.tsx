import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ayberk Aydın — ayberkayd.in'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        background: '#060608',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'monospace',
        padding: '48px',
        position: 'relative',
      }}>
        {/* scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
        }} />

        {/* terminal window chrome */}
        <div style={{
          background: '#0d100e',
          border: '1px solid #182a1e',
          borderRadius: 10,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          flex: 1,
          boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
        }}>
          {/* title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 16px', height: 42,
            background: '#0d100e', borderBottom: '1px solid #182a1e',
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ color: '#4a6b55', fontSize: 13 }}>Terminal — guest@ayberk</div>
            <div style={{ width: 60 }} />
          </div>

          {/* content */}
          <div style={{ padding: '36px 48px', display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            <div style={{ color: '#4a6b55', fontSize: 14, marginBottom: 24 }}>
              AYBERK_OS v2026.07.04 — Connected · Guest
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ color: '#39ff88', fontSize: 16 }}>guest@ayberk:~$</span>
              <span style={{ color: '#b8ffdc', fontSize: 16 }}>whoami</span>
            </div>

            <div style={{ paddingLeft: 16, marginBottom: 32 }}>
              <div style={{ color: '#b8ffdc', fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 8 }}>
                Ayberk Aydın
              </div>
              <div style={{ color: '#4a6b55', fontSize: 18 }}>
                Computer Engineer · Security Researcher · Builder
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ color: '#39ff88', fontSize: 16 }}>guest@ayberk:~$</span>
              <span style={{ color: '#b8ffdc', fontSize: 16 }}>cat skills.txt</span>
            </div>

            <div style={{ display: 'flex', gap: 40, paddingLeft: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['security', 'Burp Suite · Nmap · Wireshark · CTF'],
                  ['webdev',   'Next.js · React · TypeScript · Supabase'],
                  ['ai',       'Anthropic Claude API · Streaming'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 20 }}>
                    <span style={{ color: '#2a3d30', fontSize: 14, width: 70, textTransform: 'uppercase' }}>{k}</span>
                    <span style={{ color: '#4a6b55', fontSize: 14 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#39ff88', fontSize: 16 }}>guest@ayberk:~$</span>
                <span style={{ color: '#b8ffdc', fontSize: 16 }}>_</span>
              </div>
              <div style={{ color: '#39ff88', fontSize: 20, fontWeight: 700, letterSpacing: '0.05em' }}>
                ayberkayd.in
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
