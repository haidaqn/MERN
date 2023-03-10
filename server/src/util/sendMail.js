const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

//
const sendMail = asyncHandler(async ({email,html}) => {
        
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Mern 👻" <haidang02032003@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot Password", // Subject line
        html: html, // html body
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return info;

});

module.exports = sendMail;