const nodemailer = require('nodemailer');
const config_mail = require('../config/config');

exports.send_pass_to_mail = function(mail_get_pass, pass_dicipher) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            //user: 'sciencepost95@gmail.com', // tên mail gửi pass
            //pass: '*******' //pass word lúc đăng ký gmail
            user: config_mail.config_mail.mail,
            pass: config_mail.config_mail.pass
        }
    });
    var mailOptions = {
        from: config_mail.config_mail.mail,
        //to: query_getpass[0].email,
        to: mail_get_pass,
        subject: 'Get password',
        //text: 'Password của bạn là: ' + crypto.dicipher_pass(query_getpass[0].pass)
        text: 'Password của bạn là: ' + pass_dicipher
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Lỗi bảo mật của gmail'); // vào trang cá nhân google cài đặt lại
        } else {
            console.log('Message sent: ' + info.response);
        };
    });
}

exports.admin_repy_contact = function(mail_get_reply, content_reply) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: config_mail.config_mail.mail,
            pass: config_mail.config_mail.pass
        }
    });
    var mailOptions = {
        from: config_mail.config_mail.mail,
        to: mail_get_reply,
        subject: 'Reply contact',
        text: 'Hi! I am admin of website blog, Bellow is content reply: \n' + content_reply + '\n Thank for you!'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Lỗi bảo mật của gmail'); // vào trang cá nhân google cài đặt lại
        } else {
            console.log('Message sent: ' + info.response);
        };
    });
}