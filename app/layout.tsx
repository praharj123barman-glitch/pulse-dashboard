import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pulse — Analytics Dashboard',
  description: 'Modern analytics dashboard built with Next.js and Recharts',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
