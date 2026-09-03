import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM || 'excelardor@gmail.com',
      pass: process.env.EMAIL_APP_PASSWORD, // App password from Google Account
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'excelardor@gmail.com',
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};
