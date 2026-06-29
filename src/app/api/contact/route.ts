import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Extract fields
    const {
      companyName,
      hearAboutUs,
      industry,
      application,
      mastHeight,
      devicesCount,
      devicesWeight,
      name,
      email,
      phone,
      message
    } = data;

    // Validate required fields
    if (!hearAboutUs || !industry || !application || !mastHeight || !devicesCount || !devicesWeight || !name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled.' },
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Company Name</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${companyName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>How Did You Hear About Us?</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${hearAboutUs}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Industry</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${industry}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Application</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${application}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Required Mast Height</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${mastHeight}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Number of Devices</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${devicesCount}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Total Weight</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${devicesWeight}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Contact Person</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone}</td>
            </tr>
          </tbody>
        </table>

        <h3 style="margin-top: 30px; margin-bottom: 10px;">Project Requirements</h3>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>

        <p style="margin-top: 30px; font-size: 0.9em; color: #6b7280;">
          <strong>Submitted On:</strong> ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `Sharada Associates Website <${process.env.MAIL_FROM}>`,
      replyTo: email,
      to: process.env.MAIL_TO,
      subject: `New Application Inquiry - ${companyName || name}`,
      html: htmlBody,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send inquiry.' },
      { status: 500 }
    );
  }
}
