'use client'

import { useState, useTransition } from 'react'
import type { Lead, Profile, Stage } from '@/lib/crm-types'
import { STAGE_LABELS, STAGE_COLORS, ALL_STAGES } from '@/lib/crm-types'
import { updateLeadStage, assignLead } from './actions'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LeadsTable({ leads, team }: { leads: Lead[]; team: Profile[] }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState<Stage | 'all'>('all')
  const [, startTransition] = useTransition()

  const filtered = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter
    return matchesSearch && matchesStage
  })

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={stageFilter}
          onChange={e => setStageFilter(e.target.value as Stage | 'all')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
        >
          <option value="all">All stages</option>
          {ALL_STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
        </select>
        <span className="ml-auto text-sm text-gray-500 self-center">
          {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Budget</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Stage</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Assigned To</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400 text-sm">No leads found.</td></tr>
              )}
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.property_type ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.budget_range ?? '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.stage}
                      onChange={e => startTransition(() => updateLeadStage(lead.id, e.target.value as Stage))}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 ${STAGE_COLORS[lead.stage]}`}
                    >
                      {ALL_STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.assigned_to ?? ''}
                      onChange={e => startTransition(() => assignLead(lead.id, e.target.value))}
                      className="text-xs text-gray-600 border-0 bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                    >
                      <option value="">Unassigned</option>
                      {team.map(m => <option key={m.id} value={m.id}>{m.full_name}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
