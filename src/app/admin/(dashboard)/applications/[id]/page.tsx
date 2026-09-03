import { createServerComponentClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ApplicationDetailsClient } from './ApplicationDetailsClient';

export const dynamic = 'force-dynamic';

export default async function ApplicationDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = createServerComponentClient();

  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !application) {
    notFound();
  }

  // Generate signed URL for resume
  let resumeUrl = null;
  if (application.resume_file_path) {
    const { data: urlData, error: urlError } = await supabase.storage
      .from('resume')
      .createSignedUrl(application.resume_file_path, 60 * 60, { download: true }); // 1 hour expiry with forced download

    if (urlError) {
      console.error('Error creating signed URL:', urlError);
    }

    if (!urlError && urlData) {
      resumeUrl = urlData.signedUrl;
      console.log('Generated Signed URL:', resumeUrl);
    }
  }

  return <ApplicationDetailsClient application={application} resumeUrl={resumeUrl} />;
}
