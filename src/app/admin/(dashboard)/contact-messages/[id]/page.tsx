import { createServerComponentClient } from '@/utils/supabase/server';
import { ContactDetailsClient } from './ContactDetailsClient';

export const dynamic = 'force-dynamic';

export default async function ContactDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = createServerComponentClient();

  const { data: message, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !message) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load message details.
      </div>
    );
  }

  return (
    <div className="p-8">
      <ContactDetailsClient message={message} />
    </div>
  );
}
