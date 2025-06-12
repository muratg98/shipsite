// src/app/(frontend)/layout.tsx
import { Metadata } from 'next'
import { Header } from '@/globals/Header/Component'
import { Footer } from '@/globals/Footer/Component'
import { Toaster } from '@/components/ui/sonner'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'

export const metadata: Metadata = {
  title: 'Frontend Pages',
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <>
        <Toaster richColors />
        <AdminBar adminBarProps={{ preview: isEnabled }} />
        {children}
    </>
  )
}
