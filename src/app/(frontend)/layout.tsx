// src/app/layout.tsx
import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Providers } from '@/providers'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body>
        <Toaster/>
      <Providers>
        {children}
        </Providers>
      </body>
    </html>
  )
}
