import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Lead, Stage } from '@/lib/crm-types'
import { ALL_STAGES, STAGE_LABELS } from '@/lib/crm-types'
import PipelineCard from './PipelineCard'

export const metadata: Metadata = { title: 'Pipeline | TPG CRM' }

const STAGE_BORDER: Record<Stage, string> = {
  new: 'border-t-blue-400',
  contacted: 'border-t-yellow-400',
  showing: 'border-t-orange-400',
  offer: 'border-t-purple-400',
  closed: 'border-t-green-500',
  lost: 'border-t-gray-300',
}

export default async function CRMPipelinePage() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('leads')
    .select('*, assignee:profiles!assigned_to(id, full_name, role, created_at)')
    .order('updated_at', { ascending: false })

  const byStage = ALL_STAGES.reduce<Record<Stage, Lead[]>>((acc, s) => {
    acc[s] = (leads ?? []).filter((l: Lead) => l.stage === s)
    return acc
  }, {} as Record<Stage, Lead[]>)

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500 mt-0.5">Move leads through deal stages</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {ALL_STAGES.map(stage => (
          <div key={stage} className="flex-shrink-0 w-64 flex flex-col">
            <div className={`bg-white rounded-xl border border-gray-200 border-t-4 ${STAGE_BORDER[stage]} flex flex-col`} style={{ maxHeight: 'calc(100vh - 220px)' }}>
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{STAGE_LABELS[stage]}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{byStage[stage].length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {byStage[stage].length === 0 && <p className="text-xs text-gray-400 text-center py-6">No leads</p>}
                {byStage[stage].map(lead => <PipelineCard key={lead.id} lead={lead as Lead} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
