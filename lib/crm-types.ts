export type Stage = 'new' | 'contacted' | 'showing' | 'offer' | 'closed' | 'lost'

export interface Profile {
  id: string
  full_name: string
  role: 'agent' | 'admin'
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  property_type: string | null
  budget_range: string | null
  timeline: string | null
  message: string | null
  stage: Stage
  assigned_to: string | null
  source: 'website' | 'manual' | 'referral'
  submitted_at: string | null
  created_at: string
  updated_at: string
  assignee?: Profile | null
}

export interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  notes: string | null
  lead_id: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export const STAGE_LABELS: Record<Stage, string> = {
  new: 'New',
  contacted: 'Contacted',
  showing: 'Showing',
  offer: 'Offer',
  closed: 'Closed',
  lost: 'Lost',
}

export const STAGE_COLORS: Record<Stage, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  showing: 'bg-orange-100 text-orange-700',
  offer: 'bg-purple-100 text-purple-700',
  closed: 'bg-green-100 text-green-700',
  lost: 'bg-gray-100 text-gray-500',
}

export const ALL_STAGES: Stage[] = ['new', 'contacted', 'showing', 'offer', 'closed', 'lost']
