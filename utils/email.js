const nodemailer = require('nodemailer');
const { options } = require('../routes/utilisateurRoutes');

const sendEMail = async options => {
// 1) Create a transporter
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b781a756eb218f",
      pass: "f59d272fa26748"
    }
});

// 2) Define the email options
const mailOptions = {
    from: 'Arru <arru@noreply.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
}

// 3) actually send the email
await transport.sendMail(mailOptions);

}

module.exports = sendEMail;