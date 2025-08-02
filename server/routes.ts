import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the message
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification
      try {
        await sendContactEmail(validatedData);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue even if email fails, as we've stored the message
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Contact message sent successfully",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendContactEmail(data: any) {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || 'your-app-password'
    }
  });

  // Email to company
  const companyMailOptions = {
    from: process.env.SMTP_USER || process.env.EMAIL_USER || 'your-email@gmail.com',
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || process.env.EMAIL_USER || 'info@estarra.com',
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ff6b35; font-family: 'Poppins', sans-serif;">
            <span style="color: #ff6b35;">E</span>starra Construction
          </h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #ff6b35;">
          <h2 style="color: #1a1a1a; font-family: 'Poppins', sans-serif; margin-bottom: 20px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #1a1a1a;">Name:</strong>
            <span style="color: #666;">${data.name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #1a1a1a;">Email:</strong>
            <span style="color: #666;">${data.email}</span>
          </div>
          
          ${data.phone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #1a1a1a;">Phone:</strong>
            <span style="color: #666;">${data.phone}</span>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #1a1a1a;">Message:</strong>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 5px; color: #666;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666;">
            Submitted on: ${new Date().toLocaleString()}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
          <p>This email was sent from the Estarra Construction website contact form.</p>
        </div>
      </div>
    `
  };

  // Confirmation email to customer
  const customerMailOptions = {
    from: process.env.SMTP_USER || process.env.EMAIL_USER || 'your-email@gmail.com',
    to: data.email,
    subject: 'Thank you for contacting Estarra Construction',
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ff6b35; font-family: 'Poppins', sans-serif;">
            <span style="color: #ff6b35;">E</span>starra Construction
          </h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
          <h2 style="color: #1a1a1a; font-family: 'Poppins', sans-serif; margin-bottom: 20px;">
            Thank You for Your Interest!
          </h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Dear ${data.name},
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to Estarra Construction. We have received your message and appreciate your interest in our premium construction and design services.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Our team will review your inquiry and get back to you within 24 hours. In the meantime, feel free to explore our portfolio and services on our website.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #ff6b35; margin: 20px 0;">
            <h3 style="color: #1a1a1a; font-family: 'Poppins', sans-serif; margin-bottom: 10px;">
              Your Message Summary:
            </h3>
            <p style="color: #666; margin: 0;">
              "${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}"
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #ff6b35;">The Estarra Construction Team</strong>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <div style="margin-bottom: 15px;">
            <a href="tel:+15551234567" style="color: #ff6b35; text-decoration: none; margin: 0 10px;">
              📞 +1 (555) 123-4567
            </a>
            <a href="mailto:info@estarra.com" style="color: #ff6b35; text-decoration: none; margin: 0 10px;">
              ✉️ info@estarra.com
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">
            Building dreams into reality with premium construction and innovative design solutions.
          </p>
        </div>
      </div>
    `
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(companyMailOptions),
    transporter.sendMail(customerMailOptions)
  ]);
}
