import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@/utils/supabase/server';
import { sendEmail } from '@/utils/email';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const companyName = formData.get('companyName') as string;
    const hearAboutUs = formData.get('hearAboutUs') as string;
    const industry = formData.get('industry') as string;
    const application = formData.get('application') as string;
    const mastHeight = formData.get('mastHeight') as string;
    const devicesCount = formData.get('devicesCount') as string;
    const devicesWeight = formData.get('devicesWeight') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerComponentClient();

    // Insert Contact Message into Database
    const { data: dbData, error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        {
          company_name: companyName,
          hear_about_us: hearAboutUs,
          industry,
          application,
          mast_height: mastHeight,
          devices_count: devicesCount,
          devices_weight: devicesWeight,
          contact_person: name,
          email,
          phone,
          project_requirements: message,
        },
      ]);

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    // Send Admin Notification Email
    try {
      await sendEmail({
        to: process.env.APPLICATION_NOTIFICATION_EMAIL || 'excelardor@gmail.com',
        subject: `New Application Inquiry — ${companyName || name}`,
        html: `
          <h2>New Application Inquiry</h2>
          <p><strong>Company Name:</strong> ${companyName || 'N/A'}</p>
          <p><strong>Contact Person:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Application:</strong> ${application}</p>
          <p><strong>Mast Height:</strong> ${mastHeight}</p>
          <p><strong>Devices Count:</strong> ${devicesCount}</p>
          <p><strong>Devices Weight:</strong> ${devicesWeight}</p>
          <p><strong>Hear About Us:</strong> ${hearAboutUs}</p>
          <p><strong>Message/Requirements:</strong><br/>${message}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          <hr/>
          <p>Access the <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin">Admin Panel</a> to view this message.</p>
        `,
      });
    } catch (e) {
      console.error('Failed to send admin email:', e);
      // Don't fail the whole request just because email failed
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
