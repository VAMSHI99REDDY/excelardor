import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to escape HTML to prevent XSS in emails
const escapeHtml = (unsafe: string) => {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Extract and trim fields
    const companyName = (data.companyName || '').trim();
    const hearAboutUs = (data.hearAboutUs || '').trim();
    const industry = (data.industry || '').trim();
    const application = (data.application || '').trim();
    const mastHeight = (data.mastHeight || '').trim();
    const devicesCount = (data.devicesCount || '').trim();
    const devicesWeight = (data.devicesWeight || '').trim();
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const message = (data.message || '').trim();

    // Validate required fields
    if (!hearAboutUs || !industry || !application || !mastHeight || !devicesCount || !devicesWeight || !name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Basic phone validation (allowing digits, spaces, plus, dashes, parentheses)
    const phoneRegex = /^[0-9\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Application Inquiry</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 40%;"><strong>Company Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(companyName) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>How Did You Hear About Us:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(hearAboutUs)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Industry:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(industry)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Application:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(application)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Required Mast Height:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(mastHeight)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Number of Devices:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(devicesCount)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Total Weight:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(devicesWeight)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Contact Person:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Customer Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone Number:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(phone)}</td>
            </tr>
          </tbody>
        </table>

        <h3 style="margin-top: 30px; margin-bottom: 10px;">Project Requirements:</h3>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</div>

        <p style="margin-top: 30px; font-size: 0.9em; color: #6b7280;">
          <strong>Submitted On:</strong> ${new Date().toLocaleString()}
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; text-align: center;">
          <p>Reply directly to this email to contact the customer.</p>
          <p><strong>Reply-To:</strong> ${escapeHtml(email)}</p>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `Sharada Associates Website <${process.env.MAIL_FROM}>`,
      replyTo: email,
      to: process.env.MAIL_TO || 'bhaskarvamshi99@gmail.com',
      subject: `New Application Inquiry - ${companyName || name}`,
      html: htmlBody,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("================================");
    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Message ID:", info.messageId);
    console.log("SMTP Response:", info.response);
    console.log("================================");

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully.',
        messageId: info.messageId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("================================");
    console.error("EMAIL SENDING FAILED");
    console.error(error);
    console.error("================================");
    
    return NextResponse.json(
      { success: false, message: 'Failed to send inquiry.' },
      { status: 500 }
    );
  }
}
