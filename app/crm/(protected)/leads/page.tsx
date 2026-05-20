import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import LeadsTable from './LeadsTable'
import NewLeadForm from './NewLeadForm'
import type { Lead, Profile } from '@/lib/crm-types'

export const metadata: Metadata = { title: 'Leads | TPG CRM' }

export default async function CRMLeadsPage() {
  const supabase = await createClient()

  const [{ data: leads }, { data: team }] = await Promise.all([
    supabase
      .from('leads')
      .select('*, assignee:profiles!assigned_to(id, full_name, role, created_at)')
      .order('created_at', { ascending: false }),
    supabase.from('profiles').select('*').order('full_name'),
  ])

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">All inquiries and contacts</p>
        </div>
        <NewLeadForm />
      </div>
      <LeadsTable leads={(leads ?? []) as Lead[]} team={(team ?? []) as Profile[]} />
    </div>
  )
}
