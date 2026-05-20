'use client'

import { useState } from 'react'
import type { Client } from '@/lib/crm-types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  )

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
        <span className="ml-auto text-sm text-gray-500 self-center">
          {filtered.length} client{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">No clients found.</td></tr>
              )}
              {filtered.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{client.name}</td>
                  <td className="px-4 py-3 text-gray-600">{client.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{client.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{client.notes ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(client.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
