'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addNote(leadId: string, noteText: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lead_notes')
    .insert({
      lead_id: leadId,
      note_text: noteText,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Failed to add note')
  }

  revalidatePath(`/leads/${leadId}`)

  return data
}

export async function updateLeadStatus(leadId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)

  if (error) {
    console.error(error)
    throw new Error('Failed to update status')
  }

  revalidatePath(`/leads/${leadId}`)
}
