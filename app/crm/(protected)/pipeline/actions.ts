'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Stage } from '@/lib/crm-types'

export async function moveLeadToStage(leadId: string, stage: Stage) {
  const supabase = await createClient()
  await supabase
    .from('leads')
    .update({ stage, updated_at: new Date().toISOString() })
    .eq('id', leadId)
  revalidatePath('/crm/pipeline')
  revalidatePath('/crm/leads')
}
