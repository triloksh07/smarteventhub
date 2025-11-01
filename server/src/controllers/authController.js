import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { sendEmail } from '../utils/mailer.js';

export async function signup(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashed, name });
    req.session.adminId = admin._id.toString();
    
    // Send welcome email (non-blocking)
    const welcomeHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1>Welcome to Smart Event Hub!</h1>
        </div>
        <div style="padding: 30px; background: white;">
          <p>Hi ${name || 'there'},</p>
          <p>Welcome to <strong>Smart Event Hub</strong>! Your admin account has been successfully created.</p>
          <h3 style="color: #667eea;">What you can do:</h3>
          <ul>
            <li>Create and manage events</li>
            <li>Share registration links</li>
            <li>Generate certificates</li>
            <li>Track participants</li>
            <li>Customize registration forms</li>
          </ul>
          <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/events" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px;">Get Started</a></p>
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
          <p>Smart Event Hub - Modern Event Management</p>
        </div>
      </div>
    `;
    
    console.log(`📧 Attempting to send welcome email to: ${email}`);
    sendEmail({
      to: email,
      subject: 'Welcome to Smart Event Hub!',
      html: welcomeHTML,
    }).then(() => {
      console.log(`✅ Welcome email queued for: ${email}`);
    }).catch((err) => {
      console.error(`❌ Failed to send welcome email to ${email}:`, err.message);
    });
    res.json({ id: admin._id, email: admin.email, name: admin.name });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.adminId = admin._id.toString();

    // Send login notification email (non-blocking)
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
          <p>Hello ${admin.name || 'Admin'},</p>
          <p>You have successfully logged into your Smart Event Hub admin account.</p>
          <div style="background: #f5f7fa; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0;">
            <strong>Login Details:</strong><br>
            <span style="color: #666;">Time: ${loginTime}</span><br>
            <span style="color: #666;">Email: ${admin.email}</span>
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
    
    console.log(`📧 Attempting to send login notification to: ${admin.email}`);
    sendEmail({
      to: admin.email,
      subject: 'Login Notification - Smart Event Hub',
      html: loginHTML,
    }).then(() => {
      console.log(`✅ Login notification queued for: ${admin.email}`);
    }).catch((err) => {
      console.error(`❌ Failed to send login notification to ${admin.email}:`, err.message);
    });

    res.json({ id: admin._id, email: admin.email, name: admin.name });
  } catch (e) {
    next(e);
  }
}

export async function logout(req, res, next) {
  try {
    req.session.destroy(() => res.json({ ok: true }));
  } catch (e) {
    next(e);
  }
}

export async function me(req, res, next) {
  try {
    const id = req.session?.adminId;
    if (!id) return res.status(200).json(null);
    const admin = await Admin.findById(id).lean();
    if (!admin) return res.status(200).json(null);
    res.json({ id: admin._id, email: admin.email, name: admin.name });
  } catch (e) {
    next(e);
  }
}
