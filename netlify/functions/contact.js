const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name, email, and message are required' })
      };
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'vipinpal7080@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f5a623; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Message</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <h2 style="color: #333;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Estarra Construction',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #f5a623; margin: 0;">Estarra Construction</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #333;">Thank You for Contacting Us</h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Estarra Construction. We have received your message and will get back to you shortly.</p>
            <p>Best regards,<br><strong>The Estarra Construction Team</strong></p>
          </div>
        </div>
      `
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Contact message sent successfully' 
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      })
    };
  }
};
