import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ayberk Aydın',
  description: 'Computer Engineer · Security Researcher · Builder',
  metadataBase: new URL('https://ayberkayd.in'),
  openGraph: {
    title: 'Ayberk Aydın',
    description: 'Computer Engineer · Security Researcher · Builder',
    url: 'https://ayberkayd.in',
    siteName: 'ayberkayd.in',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="antialiased">{children}<Analytics /></body>
    </html>
  )
}
