import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'crypto'

export const metadata: Metadata = {
  title: 'access.log',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface LogEntry {
  id: number
  time: string
  method: string
  path: string
  ip: string
  country: string
  city: string
  ua: string
  referer: string
}

const AUTH_COOKIE = 'logs_auth'
const SUSPICIOUS = /wp-|\.env|\.git|\.php|admin|phpmyadmin|xmlrpc|\.aws|config|backup|\.sql/i
const PAGE_SIZE = 300

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

async function isAuthed(): Promise<boolean> {
  const password = process.env.LOGS_PASSWORD
  if (!password) return false
  const store = await cookies()
  return store.get(AUTH_COOKIE)?.value === hash(password)
}

async function login(formData: FormData) {
  'use server'
  const password = process.env.LOGS_PASSWORD
  const attempt = String(formData.get('password') ?? '')
  if (!password || hash(attempt) !== hash(password)) {
    redirect('/logs?e=1')
  }
  const store = await cookies()
  store.set(AUTH_COOKIE, hash(password), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  })
  redirect('/logs')
}

async function fetchLogs(): Promise<LogEntry[]> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return []
  const res = await fetch(
    `${url}/rest/v1/visitor_logs?select=*&order=time.desc&limit=${PAGE_SIZE}`,
    {
      headers: { apikey: key, authorization: `Bearer ${key}` },
      cache: 'no-store',
    }
  )
  if (!res.ok) return []
  return res.json()
}

function LoginScreen({ hasError }: { hasError: boolean }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form action={login} className="w-full max-w-sm">
        <p className="mb-1" style={{ color: 'var(--text-muted)' }}>
          ayberkayd.in — restricted area
        </p>
        <div className="flex items-center gap-2 border p-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
          <span style={{ color: 'var(--prompt)' }}>sudo&nbsp;$</span>
          <input
            type="password"
            name="password"
            autoFocus
            placeholder="password"
            className="bg-transparent outline-none flex-1"
            style={{ color: 'var(--text)' }}
          />
        </div>
        {hasError && (
          <p className="mt-2" style={{ color: 'var(--error)' }}>
            access denied.
          </p>
        )}
      </form>
    </main>
  )
}

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.floor(mins / 60)}h`
  return `${Math.floor(mins / 1440)}d`
}

function Stat({ label, value, alert }: { label: string; value: string | number; alert?: boolean }) {
  return (
    <div className="border px-4 py-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
      <div className="text-2xl" style={{ color: alert ? 'var(--error)' : 'var(--prompt)' }}>{value}</div>
      <div style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}

export default async function LogsPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>
}) {
  if (!(await isAuthed())) {
    const params = await searchParams
    return <LoginScreen hasError={params.e === '1'} />
  }

  const logs = await fetchLogs()
  const dayAgo = Date.now() - 86400000
  const today = logs.filter((l) => new Date(l.time).getTime() > dayAgo)
  const uniqueIps = new Set(today.map((l) => l.ip)).size
  const suspicious = logs.filter((l) => SUSPICIOUS.test(l.path))
  const countries = [...new Set(today.map((l) => l.country).filter(Boolean))].slice(0, 6)

  return (
    <main className="min-h-screen p-4 md:p-8 scanlines vignette">
      <header className="mb-6">
        <h1 style={{ color: 'var(--prompt)' }}>
          $ tail -f /var/log/ayberkayd.in/access.log
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          last {logs.length} requests · countries (24h): {countries.join(' ') || '—'}
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="requests (24h)" value={today.length} />
        <Stat label="unique IPs (24h)" value={uniqueIps} />
        <Stat label="total shown" value={logs.length} />
        <Stat label="probe attempts" value={suspicious.length} alert={suspicious.length > 0} />
      </section>

      {logs.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>
          no logs yet — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY tanımlı mı?
        </p>
      ) : (
        <div className="overflow-x-auto border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr style={{ color: 'var(--text-muted)', background: 'var(--bg-surface)' }}>
                <th className="px-3 py-2">when</th>
                <th className="px-3 py-2">ip</th>
                <th className="px-3 py-2">geo</th>
                <th className="px-3 py-2">path</th>
                <th className="px-3 py-2">referer</th>
                <th className="px-3 py-2">agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => {
                const isProbe = SUSPICIOUS.test(l.path)
                return (
                  <tr key={l.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-3 py-1.5" style={{ color: 'var(--text-muted)' }} title={l.time}>
                      {timeAgo(l.time)}
                    </td>
                    <td className="px-3 py-1.5">{l.ip}</td>
                    <td className="px-3 py-1.5" style={{ color: 'var(--text-muted)' }}>
                      {[l.country, decodeURIComponent(l.city || '')].filter(Boolean).join('/')}
                    </td>
                    <td className="px-3 py-1.5" style={{ color: isProbe ? 'var(--error)' : 'var(--text)' }}>
                      {isProbe && '⚠ '}{l.method !== 'GET' ? `${l.method} ` : ''}{l.path}
                    </td>
                    <td className="px-3 py-1.5 max-w-48 truncate" style={{ color: 'var(--text-muted)' }}>
                      {l.referer || '—'}
                    </td>
                    <td className="px-3 py-1.5 max-w-72 truncate" style={{ color: 'var(--text-dim)' }} title={l.ua}>
                      {l.ua}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
