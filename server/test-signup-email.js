import dotenv from 'dotenv';
import { sendEmail } from './src/utils/mailer.js';

dotenv.config();

async function testSignupEmail() {
  console.log('🧪 Testing Signup Welcome Email\n');
  
  // Use a real email or Resend test address
  const testEmail = process.argv[2] || 'delivered@resend.dev';
  const testName = 'Test Admin';
  
  console.log(`Sending to: ${testEmail}\n`);
  
  const welcomeHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
        <h1>Welcome to Smart Event Hub!</h1>
      </div>
      <div style="padding: 30px; background: white;">
        <p>Hi ${testName},</p>
        <p>Welcome to <strong>Smart Event Hub</strong>! Your admin account has been successfully created.</p>
        <h3 style="color: #667eea;">What you can do:</h3>
        <ul>
          <li>Create and manage events</li>
          <li>Share registration links</li>
          <li>Generate certificates</li>
          <li>Track participants</li>
          <li>Customize registration forms</li>
        </ul>
        <p><a href="http://localhost:5173/admin/events" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px;">Get Started</a></p>
      </div>
      <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
        <p>Smart Event Hub - Modern Event Management</p>
      </div>
    </div>
  `;
  
  try {
    console.log('Sending email...');
    const result = await sendEmail({
      to: testEmail,
      subject: 'Welcome to Smart Event Hub!',
      html: welcomeHTML,
    });
    
    console.log('\n✅ SUCCESS!');
    console.log('Email ID:', result.data?.id);
    console.log('\n📬 Check your inbox at:', testEmail);
    
  } catch (error) {
    console.error('\n❌ FAILED!');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check if RESEND_API_KEY is set in .env');
    console.log('2. Verify the API key is valid at https://resend.com/api-keys');
    console.log('3. Make sure the recipient email is valid');
  }
}

console.log('📧 Signup Email Test');
console.log('Usage: node test-signup-email.js [email@example.com]');
console.log('---\n');

testSignupEmail();
