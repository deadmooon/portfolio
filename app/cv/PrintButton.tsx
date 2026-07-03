'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        background: '#39ff88', color: '#060608',
        border: 'none', padding: '10px 20px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '13px', fontWeight: 700,
        borderRadius: 4, cursor: 'pointer',
        letterSpacing: '0.04em',
      }}
    >
      print / save PDF
    </button>
  )
}
