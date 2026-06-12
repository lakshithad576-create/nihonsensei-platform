import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const mailUser = process.env.EMAIL_USER;
const mailPass = process.env.EMAIL_PASS;
const canSendEmail = Boolean(mailUser && mailPass);

const transporter = canSendEmail
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    })
  : null;

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   // Configure the email details
    const mailOptions = {
      from: mailUser,
      to: 'ydilrukshi393@gmail.com',        // ⬅️ CHANGE THIS LINE (The receiver)
      replyTo: email,                       // If you click "Reply", it goes to the student
      subject: `NihonSensei Contact Form: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #de1d4d;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #333;">${message}</p>
        </div>
      `
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Message sent successfully' });
      return;
    }

    res.json({ success: true, message: 'Message received. Email delivery is not configured.' });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

export default router;