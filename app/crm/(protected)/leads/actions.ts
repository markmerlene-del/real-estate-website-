'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Stage } from '@/lib/crm-types'

export async function updateLeadStage(leadId: string, stage: Stage) {
  const supabase = await createClient()
  await supabase
    .from('leads')
    .update({ stage, updated_at: new Date().toISOString() })
    .eq('id', leadId)
  revalidatePath('/crm/leads')
  revalidatePath('/crm/pipeline')
}

export async function assignLead(leadId: string, assigneeId: string) {
  const supabase = await createClient()
  await supabase
    .from('leads')
    .update({ assigned_to: assigneeId || null, updated_at: new Date().toISOString() })
    .eq('id', leadId)
  revalidatePath('/crm/leads')
}

export async function createLead(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('leads').insert({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || null,
    property_type: (formData.get('property_type') as string) || null,
    budget_range: (formData.get('budget_range') as string) || null,
    timeline: (formData.get('timeline') as string) || null,
    message: (formData.get('message') as string) || null,
    source: 'manual',
    stage: 'new',
  })
  revalidatePath('/crm/leads')
}
