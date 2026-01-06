// utils/resendClient.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, html, from = null) {
  try {
    const { data, error } = await resend.emails.send({
      from: from || process.env.EMAIL_FROM || 'Nyle Digital <noreply@nyledigital.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export async function sendContactConfirmation(contactData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nyle Digital Solutions</h1>
        </div>
        <div class="content">
          <h2>Thank You for Contacting Us!</h2>
          <p>Dear ${contactData.name},</p>
          <p>We have received your inquiry regarding <strong>${contactData.subject}</strong>.</p>
          <p>Our team will review your request and get back to you within 24-48 hours.</p>
          
          <h3>Your Inquiry Details:</h3>
          <ul>
            <li><strong>Service Type:</strong> ${contactData.serviceType}</li>
            <li><strong>Budget:</strong> ${contactData.budget}</li>
            <li><strong>Timeline:</strong> ${contactData.timeline}</li>
          </ul>
          
          <p>If you have any immediate questions, please don't hesitate to reply to this email.</p>
          
          <p>Best regards,<br>The Nyle Digital Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Nyle Digital Solutions. All rights reserved.</p>
          <p>123 Tech Street, San Francisco, CA 94107</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(contactData.email, 'Thank You for Contacting Nyle Digital', html);
}

export async function sendJobApplicationConfirmation(applicationData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9fafb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received</h1>
        </div>
        <div class="content">
          <h2>Thank You, ${applicationData.fullName}!</h2>
          <p>We have received your application for the <strong>${applicationData.jobId}</strong> position.</p>
          <p>Our HR team will review your application and contact you if you're shortlisted for the next round.</p>
          <p>This process typically takes 1-2 weeks.</p>
          <p>Best of luck!</p>
          <p>Best regards,<br>Nyle Digital HR Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(applicationData.email, `Application Received: ${applicationData.jobId}`, html);
}

export async function sendAdminNotification(subject, message) {
  const adminEmail = process.env.EMAIL_ADMIN || 'admin@nyledigital.com';
  
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f4f6; border-radius: 8px;">
      <h2 style="color: #2563eb;">Admin Notification</h2>
      <h3>${subject}</h3>
      <div style="background: white; padding: 20px; border-radius: 4px; margin: 20px 0;">
        ${message}
      </div>
      <p style="color: #6b7280; font-size: 12px;">This is an automated notification from Nyle Digital Solutions.</p>
    </div>
  `;

  return sendEmail(adminEmail, `[Admin] ${subject}`, html);
}