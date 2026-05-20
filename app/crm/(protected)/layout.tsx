import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CRMSidebar from '@/components/crm/Sidebar'

export default async function CRMProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/crm/login')

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <CRMSidebar user={user} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
