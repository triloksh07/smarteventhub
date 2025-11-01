import { Resend } from 'resend';

let resend;

export async function sendEmail({ to, subject, html, attachments = [] }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not set in environment variables');
      throw new Error('RESEND_API_KEY not set');
    }
    
    if (!to) {
      throw new Error('Recipient email address is required');
    }
    
    if (!resend) {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✓ Resend client initialized');
    }
    
    // Use verified email address or default
    const from = process.env.MAIL_FROM || 'onboarding@resend.dev';
    
    console.log(`📧 Sending email to: ${to}`);
    console.log(`   From: ${from}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Attachments: ${attachments.length}`);
    
    const emailData = { 
      from, 
      to, 
      subject, 
      html
    };
    
    if (attachments.length > 0) {
      emailData.attachments = attachments.map(att => ({
        filename: att.filename,
        content: att.content // base64 string
      }));
    }
    
    const response = await resend.emails.send(emailData);
    
    if (response.error) {
      console.error('❌ Resend API returned error:', response.error);
      throw new Error(response.error.message || 'Email sending failed');
    }
    
    console.log('✅ Email sent successfully:', response.data);
    return response;
  } catch (error) {
    console.error('❌ Email send failed:');
    console.error('   To:', to);
    console.error('   Error:', error.message);
    if (error.response?.data) {
      console.error('   Response:', error.response.data);
    }
    throw error;
  }
}
