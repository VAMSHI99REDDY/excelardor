import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@/utils/supabase/server';
import { sendEmail } from '@/utils/email';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const experience = formData.get('experience') as string;
    const company = formData.get('company') as string;
    const location = formData.get('location') as string;
    const message = formData.get('message') as string;
    const position = formData.get('position') as string;
    const file = formData.get('file') as File;

    // Validate required fields
    if (!name || !email || !phone || !experience || !location || !position || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate file type & size
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    const supabase = createServerComponentClient();
    
    // Create Application ID
    const applicationId = uuidv4();
    const fileName = `${applicationId}/${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const filePath = fileName;

    // Upload Resume to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resume')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
    }

    // Insert Application into Database
    const { data: appData, error: dbError } = await supabase
      .from('applications')
      .insert([
        {
          id: applicationId,
          full_name: name,
          email,
          phone,
          city: location, // Storing location in city field for now
          years_experience: experience,
          current_company: company,
          position_applied: position,
          cover_message: message,
          resume_file_path: fileName,
        },
      ]);

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      // Attempt cleanup
      await supabase.storage.from('resume').remove([fileName]);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    // Send Admin Notification Email
    try {
      await sendEmail({
        to: process.env.APPLICATION_NOTIFICATION_EMAIL || 'excelardor@gmail.com',
        subject: `New Job Application — ${position} — ${name}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Applicant Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position Applied:</strong> ${position}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Current Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Cover Message:</strong><br/>${message || 'N/A'}</p>
          <p><strong>Application ID:</strong> ${applicationId}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          <hr/>
          <p>Access the <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin">Admin Panel</a> to view the full application and download the resume.</p>
        `,
      });
    } catch (e) {
      console.error('Failed to send admin email:', e);
      // Don't fail the whole request just because email failed
    }

    // Send Applicant Confirmation Email
    try {
      await sendEmail({
        to: email,
        subject: `Application Received — ExcelArdor`,
        html: `
          <h3>Application Received</h3>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in ExcelArdor. We have successfully received your application for <strong>${position}</strong>.</p>
          <p>Our team will review your details and contact you if your profile matches our requirements.</p>
          <br/>
          <p>Regards,<br/>ExcelArdor Team</p>
          <p><small>Application ID: ${applicationId}</small></p>
        `,
      });
    } catch (e) {
      console.error('Failed to send applicant email:', e);
    }

    return NextResponse.json({ success: true, applicationId });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
