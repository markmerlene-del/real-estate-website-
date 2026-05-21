'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ChatBot from '@/components/ChatBot'

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCRM = pathname.startsWith('/crm')

  if (isCRM) return <>{children}</>

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
    </>
  )
}
