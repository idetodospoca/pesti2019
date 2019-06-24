const nodemailer = require('nodemailer');
const config = require('../config/environment');

let smtpTransport = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});

let testTransport;


function sendMail(message){
    let defaultMessage = {
        from: config.mail.username
    };

    message = Object.assign(defaultMessage, message);
  
    return smtpTransport.sendMail(message);
}

module.exports.sendMail = sendMail;
