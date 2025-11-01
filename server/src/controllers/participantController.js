import Event from '../models/Event.js';
import Participant from '../models/Participant.js';
import { sendEmail } from '../utils/mailer.js';

export async function getPublicEventByShareId(req, res, next) {
  try {
    const event = await Event.findOne({ shareId: req.params.shareId }).lean();
    if (!event) return res.status(404).json({ error: 'Invalid link' });
    res.json({
      title: event.title,
      description: event.description,
      mode: event.mode,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      location: event.location,
      customFields: event.customFields || [],
      posterUrl: event.posterPath ? `${process.env.BACKEND_URL || 'http://localhost:5000'}/${event.posterPath.replace(/\\/g,'/')}` : null,
    });
  } catch (e) {
    next(e);
  }
}

export async function registerForEvent(req, res, next) {
  try {
    const event = await Event.findOne({ shareId: req.params.shareId });
    if (!event) return res.status(404).json({ error: 'Invalid link' });
    const { name, email, phone, college, yearDept, customResponses } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

    const p = await Participant.create({ 
      name, 
      email, 
      phone, 
      college, 
      yearDept, 
      event: event._id,
      customResponses: customResponses || {}
    });

    // Confirmation email (non-blocking)
    const eventDate = event.startDateTime ? new Date(event.startDateTime).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    }) : 'TBD';
    
    const confirmationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1>✓ Registration Confirmed!</h1>
        </div>
        <div style="padding: 30px; background: white;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for registering! Your spot has been confirmed for:</p>
          
          <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #667eea; margin: 0 0 15px 0;">${event.title}</h2>
            ${event.description ? `<p style="color: #666; margin: 10px 0;">${event.description}</p>` : ''}
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${eventDate}</p>
              ${event.mode ? `<p style="margin: 5px 0;"><strong>📍 Mode:</strong> ${event.mode}</p>` : ''}
              ${event.location ? `<p style="margin: 5px 0;"><strong>🗺️ Location:</strong> ${event.location}</p>` : ''}
            </div>
          </div>
          
          <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32;"><strong>What's Next?</strong></p>
            <p style="margin: 5px 0 0 0; color: #666;">We'll send you more details closer to the event date. Keep an eye on your inbox!</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;"><strong>Your Registration Details:</strong></p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Name: ${name}</p>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Email: ${email}</p>
            ${phone ? `<p style="color: #666; font-size: 14px; margin: 5px 0;">Phone: ${phone}</p>` : ''}
            ${college ? `<p style="color: #666; font-size: 14px; margin: 5px 0;">College: ${college}</p>` : ''}
          </div>
          
          <p style="margin-top: 30px;">Looking forward to seeing you at the event!</p>
          <p>Best regards,<br><strong>The Event Team</strong></p>
        </div>
        <div style="padding: 20px; text-align: center; color: #666; font-size: 14px; background: #f5f5f5;">
          <p style="margin: 5px 0;">Smart Event Hub</p>
          <p style="margin: 5px 0; font-size: 12px;">This is an automated confirmation email</p>
        </div>
      </div>
    `;
    
    sendEmail({
      to: email,
      subject: `✓ Registration Confirmed: ${event.title}`,
      html: confirmationHTML,
    }).catch((err) => {
      console.error('Failed to send confirmation email:', err.message);
    });

    res.json({ ok: true, id: p._id });
  } catch (e) {
    if (e.code === 11000) return res.status(400).json({ error: 'You have already registered.' });
    next(e);
  }
}
