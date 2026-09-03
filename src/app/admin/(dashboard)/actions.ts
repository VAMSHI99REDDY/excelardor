'use server';

import { createServerComponentClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateApplicationAction(id: string, status: string, notes: string) {
  const supabase = createServerComponentClient();
  const { error } = await supabase
    .from('applications')
    .update({ status, admin_notes: notes })
    .eq('id', id);
  
  if (error) throw new Error(error.message);
  revalidatePath('/admin/applications');
}

export async function deleteApplicationAction(id: string, resumePath: string | null) {
  const supabase = createServerComponentClient();
  
  if (resumePath) {
    await supabase.storage.from('resume').remove([resumePath]);
  }
  
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  revalidatePath('/admin/applications');
}

export async function updateContactMessageAction(id: string, status: string, notes: string) {
  const supabase = createServerComponentClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ status, admin_notes: notes })
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  revalidatePath('/admin/contact-messages');
}

export async function deleteContactMessageAction(id: string) {
  const supabase = createServerComponentClient();
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  revalidatePath('/admin/contact-messages');
}
