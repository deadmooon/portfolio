import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      background: '#060608',
      color: '#b8ffdc',
      minHeight: '100dvh',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: 1.75,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '2rem 2.5rem',
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ color: '#4a6b55', marginBottom: '1rem' }}>AYBERK_OS v2026.07.04</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <span style={{ color: '#39ff88' }}>guest@ayberk:~$</span>
          <span>cd {typeof window !== 'undefined' ? window.location.pathname : '/???'}</span>
        </div>
        <div style={{ color: '#ff1a4b', marginBottom: 12 }}>
          bash: cd: {typeof window !== 'undefined' ? window.location.pathname : '/???'}: No such file or directory
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <span style={{ color: '#39ff88' }}>guest@ayberk:~$</span>
          <span>ls -la</span>
        </div>
        <div style={{ color: '#4a6b55', marginBottom: 12 }}>total 0</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <span style={{ color: '#39ff88' }}>guest@ayberk:~$</span>
          <span style={{ color: '#ff1a4b' }}>ERROR 404 — page not found</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #182a1e', paddingTop: '1.5rem', width: '100%', maxWidth: 480 }}>
        <div style={{ color: '#4a6b55', marginBottom: '0.75rem' }}>
          this path doesn&apos;t exist in the filesystem.
        </div>
        <Link href="/" style={{
          color: '#39ff88',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #182a1e',
          padding: '6px 14px',
          borderRadius: 4,
        }}>
          ← cd /home/guest
        </Link>
      </div>
    </div>
  )
}
