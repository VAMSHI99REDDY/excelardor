import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@/utils/supabase/server';
import { sendEmail } from '@/utils/email';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract & Normalize fields
    const name = (formData.get('name') as string || '').trim();
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const phone = (formData.get('phone') as string || '').trim();
    const experience = (formData.get('experience') as string || '').trim();
    const company = (formData.get('company') as string || '').trim();
    const location = (formData.get('location') as string || '').trim();
    const message = (formData.get('message') as string || '').trim();
    const position = (formData.get('position') as string || '').trim();
    const file = formData.get('file') as File | null;

    // 1. Full Name Validation
    if (!name) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }
    if (name.length < 3) {
      return NextResponse.json({ error: 'Full Name must be at least 3 characters.' }, { status: 400 });
    }
    if (!/^[A-Za-z\s'-]+$/.test(name)) {
      return NextResponse.json({ error: 'Full Name can only contain letters, spaces, hyphens and apostrophes.' }, { status: 400 });
    }
    const nameLetters = (name.match(/[A-Za-z]/g) || []).length;
    if (nameLetters < 2) {
      return NextResponse.json({ error: 'Full Name must contain valid letters.' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'Full Name must not exceed 100 characters.' }, { status: 400 });
    }

    // 2. Email Address Validation
    if (!email) {
      return NextResponse.json({ error: 'Email Address is required.' }, { status: 400 });
    }
    if (/\s/.test(email)) {
      return NextResponse.json({ error: 'Email Address cannot contain spaces.' }, { status: 400 });
    }
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) {
      return NextResponse.json({ error: 'Email Address must contain exactly one @ symbol.' }, { status: 400 });
    }
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!emailRegex.test(email) || email.length > 150) {
      return NextResponse.json({ error: 'Please enter a valid email address with a valid domain (e.g. name@example.com).' }, { status: 400 });
    }

    // 3. Phone Number Validation
    if (!phone) {
      return NextResponse.json({ error: 'Phone Number is required.' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: 'Phone Number must be exactly 10 digits.' }, { status: 400 });
    }
    if (/^0{10}$/.test(phone)) {
      return NextResponse.json({ error: 'Phone Number cannot contain only zeros.' }, { status: 400 });
    }

    // 4. Position Validation
    if (!position) {
      return NextResponse.json({ error: 'Position is required.' }, { status: 400 });
    }

    // 5. Years of Experience Validation
    if (!experience) {
      return NextResponse.json({ error: 'Years of Experience is required.' }, { status: 400 });
    }
    if (!/^\d+(\.\d+)?$/.test(experience)) {
      return NextResponse.json({ error: 'Years of Experience must be a positive number (decimals allowed, e.g. 2.5).' }, { status: 400 });
    }
    const expNum = parseFloat(experience);
    if (isNaN(expNum) || expNum < 0 || expNum > 50) {
      return NextResponse.json({ error: 'Years of Experience must be between 0 and 50.' }, { status: 400 });
    }

    // 6. Current Company Validation (Optional)
    if (company) {
      if (!/^[A-Za-z0-9\s&.,'()-]+$/.test(company)) {
        return NextResponse.json({ error: 'Current Company contains invalid characters.' }, { status: 400 });
      }
      if (company.length > 100) {
        return NextResponse.json({ error: 'Company name must not exceed 100 characters.' }, { status: 400 });
      }
    }

    // 7. Location Validation
    if (!location) {
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    }
    if (location.length < 2) {
      return NextResponse.json({ error: 'Location must be at least 2 characters.' }, { status: 400 });
    }
    if (!/^[A-Za-z\s,-]+$/.test(location)) {
      return NextResponse.json({ error: 'Location can only contain letters, spaces, commas and hyphens.' }, { status: 400 });
    }
    const locLetters = (location.match(/[A-Za-z]/g) || []).length;
    if (locLetters < 2) {
      return NextResponse.json({ error: 'Location must contain a valid city, state or country name.' }, { status: 400 });
    }
    if (location.length > 100) {
      return NextResponse.json({ error: 'Location must not exceed 100 characters.' }, { status: 400 });
    }

    // 8. Cover Letter / Message Validation (Optional)
    if (message && message.length > 2000) {
      return NextResponse.json({ error: 'Cover message must not exceed 2,000 characters.' }, { status: 400 });
    }

    // 9. Resume File Validation
    if (!file) {
      return NextResponse.json({ error: 'Resume upload is required.' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Resume file size exceeds the 5 MB limit.' }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: 'Uploaded resume file is empty.' }, { status: 400 });
    }

    const rawFileName = file.name || '';
    const isPdf = /\.pdf$/i.test(rawFileName);
    const isDocx = /\.docx$/i.test(rawFileName);

    if (!isPdf && !isDocx) {
      return NextResponse.json({
        error: 'Only PDF and DOCX files are allowed (.doc, images, and other formats are rejected).'
      }, { status: 400 });
    }

    // Validate MIME type if provided
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/octet-stream',
    ];
    if (file.type && !allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file MIME type.' }, { status: 400 });
    }

    // Validate File Signature / Magic Bytes
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    if (isPdf) {
      // PDF must start with %PDF- (0x25 0x50 0x44 0x46)
      const validPdfHeader = fileBuffer.length >= 4 &&
        fileBuffer[0] === 0x25 &&
        fileBuffer[1] === 0x50 &&
        fileBuffer[2] === 0x44 &&
        fileBuffer[3] === 0x46;
      if (!validPdfHeader) {
        return NextResponse.json({ error: 'Invalid file signature: Content is not a genuine PDF document.' }, { status: 400 });
      }
    } else if (isDocx) {
      // DOCX is a zip archive starting with PK\x03\x04 (0x50 0x4B 0x03 0x04)
      const validZipHeader = fileBuffer.length >= 4 &&
        fileBuffer[0] === 0x50 &&
        fileBuffer[1] === 0x4B &&
        fileBuffer[2] === 0x03 &&
        fileBuffer[3] === 0x04;
      if (!validZipHeader) {
        return NextResponse.json({ error: 'Invalid file signature: Content is not a genuine DOCX document.' }, { status: 400 });
      }
    }

    // Sanitize file name for safe storage
    const sanitizedBase = rawFileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.{2,}/g, '.');
    const applicationId = uuidv4();
    const fileName = `${applicationId}/${sanitizedBase}`;
    const uploadContentType = isPdf
      ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    // Supabase Upload & DB Insert
    const supabase = createServerComponentClient();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resume')
      .upload(fileName, fileBuffer, {
        contentType: uploadContentType,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      const errStr = String(uploadError?.message || '') + JSON.stringify(uploadError);
      const isConnectionError = errStr.includes('ENOTFOUND') || errStr.includes('fetch failed');
      const errorMessage = isConnectionError
        ? 'Database connection failed: Supabase project is unreachable. Please verify connection.'
        : `Failed to upload resume: ${uploadError.message || 'Storage error'}`;
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const { data: appData, error: dbError } = await supabase
      .from('applications')
      .insert([
        {
          id: applicationId,
          full_name: name,
          email,
          phone,
          city: location,
          years_experience: experience,
          current_company: company || null,
          position_applied: position,
          cover_message: message || null,
          resume_file_path: fileName,
        },
      ]);

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      await supabase.storage.from('resume').remove([fileName]);
      return NextResponse.json({ error: 'Failed to save application.' }, { status: 500 });
    }

    // Email Notifications (Preserved!)
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
          <p><strong>Experience:</strong> ${experience} Years</p>
          <p><strong>Current Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Cover Message:</strong><br/>${message || 'N/A'}</p>
          <p><strong>Application ID:</strong> ${applicationId}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          <hr/>
          <p>Access the <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/admin">Admin Panel</a> to view the full application and download the resume.</p>
        `,
      });
    } catch (e) {
      console.error('Failed to send admin email:', e);
    }

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
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}
