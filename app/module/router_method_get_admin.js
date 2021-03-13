const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const { as } = require("../config/db");

exports.home_admin = async(req, res) => {
    if (!req.session.username || req.session.ID != 3) {
        res.redirect('/');
    } else {
        let notify = await db.query_count('contact', { type: 0 });
        res.render('admin/home_admin', {
            notify: notify[0].count
        });
    }
}

exports.notify_contact = async(req, res) => {
    if (!req.session.username || req.session.ID != 3) { res.redirect('/'); } else {
        let notify = await db.query_count('contact', { type: 0 });
        let contact = await db.join_2_table('user', 'contact', 'user.ID', 'contact.ID_user', { 'contact.type': 0 });
        res.render('admin/notify_contact', {
            notify: notify[0].count,
            contact: contact
        });
    }
}