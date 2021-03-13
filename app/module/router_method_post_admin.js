const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const send_pass_to_mail = require('./send_pass_to_mail');

exports.reply_contact = async(req, res) => {
    let reply = await db.query_update('contact', { ID: req.body.id_contact }, {
        reply: req.body.content_reply,
        type: 1,
        date_reply: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
    });
    send_pass_to_mail.admin_repy_contact(req.body.email_contact, req.body.content_reply);
    res.redirect('/notify_contact')
}