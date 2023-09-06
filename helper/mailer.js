const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(
        `${__dirname}/../views/${filename}.pug`,
        options
    );
    const inlined = juice(html);
    return inlined;
};

exports.sendEmail = async (options) => {
    const { from, toEmail, subject, filename } = options;
    const html = generateHTML(filename, options);
    const text = htmlToText.convert(html);

    const mailOptions = {
        from: from || "Dennis Wake Up",
        to: toEmail,
        subject: subject,
        html,
        text,
    };
    return transport.sendMail(mailOptions);
};
