const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            host: "smtp.gmail.com",
            // service: process.env.SERVICE,
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: "",
                pass: "",
            },
        });

        await transporter.sendMail({
            // from: process.env.USER,
            from: "",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;