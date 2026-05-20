import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ClientsTable from './ClientsTable'
import NewClientForm from './NewClientForm'
import type { Client } from '@/lib/crm-types'

export const metadata: Metadata = { title: 'Clients | TPG CRM' }

export default async function CRMClientsPage() {
  const supabase = await createClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your contact database</p>
        </div>
        <NewClientForm />
      </div>
      <ClientsTable clients={(clients ?? []) as Client[]} />
    </div>
  )
}
