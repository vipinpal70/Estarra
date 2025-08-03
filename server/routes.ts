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
        // Create message data with default subject if not provided
        const messageData = {
          ...validatedData,
          subject: "Contact Form Inquiry" // Default subject if not in schema
        };
        
        // Debugging: Log the credentials to ensure they are loaded.
        console.log(`[SMTP Debug] User: ${process.env.SMTP_USER}`);
        console.log(`[SMTP Debug] Pass: ${process.env.SMTP_PASS ? 'Exists' : 'MISSING!'}`);

        // Create SMTP transporter with a standard secure Gmail configuration
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // Use SSL
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        // Email to company/admin
        const adminMailOptions = {
          from: process.env.FROM_EMAIL || process.env.EMAIL_FROM || 'vipinpal.dev@gmail.com',
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_TO || 'vipinpal7080@gmail.com',
          subject: `New Contact Form Submission from ${messageData.name}`,
          text: `Name: ${messageData.name}\nEmail: ${messageData.email}\nPhone: ${messageData.phone || 'N/A'}\nMessage: ${messageData.message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #f5a623; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Contact Message</h1>
              </div>
              <div style="padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
                <h2 style="color: #333;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                      <strong style="color: #1a1a1a;">Name:</strong>
                      <span style="color: #666;">${messageData.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                      <strong style="color: #1a1a1a;">Email:</strong>
                      <span style="color: #666;">${messageData.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                      <strong style="color: #1a1a1a;">Phone:</strong>
                      <span style="color: #666;">${messageData.phone || 'Not provided'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;">
                      <strong style="color: #1a1a1a;">Message:</strong>
                      <p style="color: #666; margin-top: 5px;">${messageData.message}</p>
                    </td>
                  </tr>
                </table>
                <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                  This email was sent from the Estarra Construction website contact form.
                </p>
              </div>
            </div>
          `
        };

        // Confirmation email to customer
        const userMailOptions = {
          from: process.env.FROM_EMAIL || process.env.EMAIL_FROM || 'vipinpal.dev@gmail.com',
          to: messageData.email,
          subject: 'Thank you for contacting Estarra Construction',
          text: `Dear ${messageData.name},\n\nThank you for contacting Estarra Construction. We have received your inquiry and will get back to you as soon as possible.\n\nHere's a summary of your message:\n\nName: ${messageData.name}\nEmail: ${messageData.email}\nPhone: ${messageData.phone || 'N/A'}\nMessage: ${messageData.message}\n\nWe appreciate your interest in our services and will respond to your inquiry within 24-48 hours.\n\nBest Regards,\nEstarra Construction Team`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                <h1 style="color: #f5a623; margin: 0;">Estarra Construction</h1>
              </div>
              <div style="padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #333;">Thank You for Contacting Us</h2>
                <p style="color: #666;">Dear ${messageData.name},</p>
                <p style="color: #666;">
                  Thank you for reaching out to Estarra Construction. We have received your message and will get back to you shortly.
                </p>
                <p style="color: #666;">
                  Here's a summary of the information you provided:
                </p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 3px solid #f5a623; margin: 15px 0;">
                  <p style="color: #666; margin: 0;">
                    "${messageData.message.substring(0, 100)}${messageData.message.length > 100 ? '...' : ''}"
                  </p>
                </div>
                <p style="color: #666;">
                  Best regards,<br>
                  <strong>The Estarra Construction Team</strong>
                </p>
              </div>
              <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                <p> 2025 Estarra Construction. All rights reserved.</p>
              </div>
            </div>
          `
        };

        try {
          console.log('Sending emails...');
          await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
          ]);
          console.log('Emails sent successfully');
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          // Continue processing even if email sending fails
          // This ensures the API still returns success to the client
        }  
      } catch (error) {
        console.error("Failed to process contact form:", error);
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

// This function has been deprecated and replaced by the SendGrid implementation in the contact form endpoint
// Keeping this comment as a reference that the function was intentionally removed
