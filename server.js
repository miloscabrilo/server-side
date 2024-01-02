// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// Configure nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'demetra.info.mne@gmail.com',
    pass: 'demetra2023',
  },
});

// Define a route to handle the form submission
app.post('/send-email', (req, res) => {
  const { name, number, email, message } = req.body;

  // Create email content
  const mailOptions = {
    from: 'demetra.info.mne@gmail.com',
    to: 'mlscabrilo5@gmail.com',
    subject: 'New Form Submission',
    html: `<p>Name: ${name}</p><p>Number: ${number}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
