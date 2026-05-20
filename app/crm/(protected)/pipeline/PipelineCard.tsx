'use client'

import { useTransition } from 'react'
import type { Lead, Stage } from '@/lib/crm-types'
import { ALL_STAGES, STAGE_LABELS } from '@/lib/crm-types'
import { moveLeadToStage } from './actions'

export default function PipelineCard({ lead }: { lead: Lead }) {
  const [, startTransition] = useTransition()

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-gray-200 transition-colors">
      <p className="text-sm font-medium text-gray-900 mb-1">{lead.name}</p>
      {lead.property_type && <p className="text-xs text-gray-500 mb-1">{lead.property_type}</p>}
      {lead.budget_range && <p className="text-xs text-amber-600 font-medium mb-1">{lead.budget_range}</p>}
      {lead.assignee && (
        <p className="text-xs text-gray-400 mb-2">→ {(lead.assignee as { full_name: string }).full_name}</p>
      )}
      <select
        value={lead.stage}
        onChange={e => {
          const newStage = e.target.value as Stage
          if (newStage !== lead.stage) startTransition(() => moveLeadToStage(lead.id, newStage))
        }}
        className="w-full mt-1 text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
        aria-label="Move to stage"
      >
        {ALL_STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
      </select>
    </div>
  )
}
