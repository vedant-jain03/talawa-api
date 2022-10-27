const nodemailer = require('nodemailer');

const { ERROR_IN_SENDING_MAIL } = require('../../constants');

/**
 * This function uses node mailer to send the mail.
 * @param {string} email : receiver email address.
 * @param {string} subject : subject of the mail.
 * @param {string} body : body of the mail.
 * @returns {Promise} 
 */
const mailer = (email, subject, body) => {
  //NODEMAILER SPECIFIC STUFF
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: 'Talawa<>noreply@gmail.com',
    to: email,
    subject: subject,
    html: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        reject(ERROR_IN_SENDING_MAIL);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = mailer;
