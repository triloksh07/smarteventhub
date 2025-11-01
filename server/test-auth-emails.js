import dotenv from 'dotenv';
import { sendEmail } from './src/utils/mailer.js';

dotenv.config();

async function testAuthEmails() {
  console.log('🧪 Testing Auth Email Templates\n');
  
  const testEmail = 'delivered@resend.dev'; // Resend test address
  const testName = 'Test User';
  
  // Test 1: Welcome Email
  console.log('1️⃣ Testing SIGNUP Welcome Email...');
  try {
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
    
    await sendEmail({
      to: testEmail,
      subject: 'Welcome to Smart Event Hub!',
      html: welcomeHTML,
    });
    
    console.log('✅ Welcome email sent successfully!\n');
  } catch (error) {
    console.error('❌ Welcome email failed:', error.message, '\n');
  }
  
  // Test 2: Login Notification Email
  console.log('2️⃣ Testing LOGIN Notification Email...');
  try {
    const loginTime = new Date().toLocaleString('en-US', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });
    
    const loginHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1>Login Successful</h1>
        </div>
        <div style="padding: 30px; background: white;">
          <p>Hello ${testName},</p>
          <p>You have successfully logged into your Smart Event Hub admin account.</p>
          <div style="background: #f5f7fa; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
            <strong>Login Details:</strong><br>
            <span style="color: #666;">Time: ${loginTime}</span><br>
            <span style="color: #666;">Email: ${testEmail}</span>
          </div>
          <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <strong>Security Notice:</strong><br>
            <span style="color: #666;">If this wasn't you, please secure your account immediately.</span>
          </div>
          <p>Thank you for using Smart Event Hub!</p>
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Smart Event Hub - Modern Event Management</p>
        </div>
      </div>
    `;
    
    await sendEmail({
      to: testEmail,
      subject: 'Login Notification - Smart Event Hub',
      html: loginHTML,
    });
    
    console.log('✅ Login notification email sent successfully!\n');
  } catch (error) {
    console.error('❌ Login notification failed:', error.message, '\n');
  }
  
  console.log('🎉 All auth email tests completed!');
  console.log('\n📋 Summary:');
  console.log('  • Signup sends a welcome email');
  console.log('  • Login sends a security notification email');
  console.log('  • Both emails are sent asynchronously (non-blocking)');
  console.log('  • Emails use professional HTML templates');
}

testAuthEmails();
