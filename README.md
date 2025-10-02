# NodeJs_email_testin

This is a simple Node.js test script using Nodemailer to send emails from the server. It supports Gmail (with App Password) and custom domain SMTP. The script verifies server connectivity and authentication by sending a basic test email, ensuring your email setup works before full project integration.

## Features

- ✅ Send emails using Gmail with App Password
- ✅ Support for custom domain email addresses via SMTP
- ✅ SMTP connection verification
- ✅ RESTful API endpoint for sending emails
- ✅ Environment variable configuration for security

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account with App Password enabled (for Gmail setup) OR custom domain email with SMTP credentials

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Bilal112/NodeJs_email_testin.git
cd NodeJs_email_testin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

### For Gmail:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=5000
```

**Note:** For Gmail, you need to generate an App Password:
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file

### For Custom Domain Email:
Modify `server.js` to use your custom SMTP settings:
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.yourdomain.com",  // Your SMTP host
  port: 587,                     // Usually 587 or 465
  secure: false,                 // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Usage

1. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

2. Send a test email using the API:

Using cURL:
```bash
curl -X POST http://localhost:5000/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "message": "This is a test email from Node.js!"
  }'
```

Using Postman or any API client:
- **Method:** POST
- **URL:** `http://localhost:5000/send-email`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "message": "This is a test email from Node.js!"
}
```

## API Endpoints

### POST /send-email

Send an email via the configured SMTP server.

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "message": "Email body text"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Failed to send email"
}
```

## Troubleshooting

### Gmail Authentication Error
- Make sure you're using an App Password, not your regular Gmail password
- Enable 2-Step Verification in your Google Account
- Generate a new App Password specifically for this application

### SMTP Connection Error
- Verify your SMTP host, port, and credentials are correct
- Check if your firewall is blocking the SMTP port
- For custom domains, ensure your hosting provider allows SMTP connections

### Port Already in Use
If port 5000 is already in use, change the PORT in your `.env` file:
```
PORT=3000
```

## Security Notes

- Never commit your `.env` file to version control
- Always use environment variables for sensitive data
- Use App Passwords instead of your main account password
- Keep your dependencies updated

## License

MIT
