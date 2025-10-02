const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// API route to send email
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || "bilalirfan000@gmail.com",
      subject: subject || "Test Email",
      text: message,
    };

    // Verify SMTP connection
    transporter.verify((err, success) => {
      if (err) {
        console.error("❌ SMTP Connection Error:", err.message || err);
      } else {
        console.log("✅ SMTP Server is ready to send messages");
      }
    });

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
