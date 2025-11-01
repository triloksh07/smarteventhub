import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

async function testEmail() {
  console.log('🧪 Email Diagnostic Test\n');
  
  // Check API key
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY is not set in .env file');
    return;
  }
  console.log('✓ API Key found:', apiKey.substring(0, 10) + '...');
  
  // Initialize Resend
  const resend = new Resend(apiKey);
  console.log('✓ Resend client initialized\n');
  
  // Test email send
  try {
    console.log('📧 Sending test email...');
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Required for testing
      to: 'delivered@resend.dev', // Resend test address
      subject: 'Smart Event Hub - Email Test',
      html: '<h1>Email Working!</h1><p>Your email configuration is correct.</p>'
    });
    
    console.log('✅ SUCCESS! Email sent:', result);
    console.log('\n🎉 Email functionality is working correctly!');
  } catch (error) {
    console.error('\n❌ FAILED to send email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    
    if (error.message.includes('API key')) {
      console.error('\n💡 Your API key might be invalid. Get a new one from:');
      console.error('   https://resend.com/api-keys');
    }
  }
}

testEmail();
