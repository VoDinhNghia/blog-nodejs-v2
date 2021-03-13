const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const send_pass_to_mail = require('./send_pass_to_mail');

// method post
exports.login_sucsses = async(req, res) => {
    let user_login = await db.query_select('user', { name: req.body.Username, pass: crypto.crypto_pass(req.body.Password) });
    if (user_login.length > 0) {
        req.session.loggedin = true;
        req.session.username = user_login[0].name;
        req.session.ID = user_login[0].ID;
        res.cookie('username', user_login[0].name);
        res.cookie('ID', user_login[0].ID);
        if (user_login[0].level == 1) {
            res.redirect('/admin_home');
        } else {
            res.redirect('/home');
        }
    } else {
        res.render("user/login", {
            mess: "Username or pass incornect!"
        });
    }
    res.end();
}

exports.signup = async(req, res) => {
    let signup = await db.query_insert('user', {
        name: req.body.Username,
        email: req.body.Email,
        pass: crypto.crypto_pass(req.body.Password),
        mobile: req.body.Mobile,
        level: 0, // user bình thường, nếu 1 là admin
        created_at: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
        date_update: '',
        avatar: '',
        country: req.body.Country
    });
    res.redirect('/')
}

exports.getpass = async(req, res) => {
    let insert_forgetPass = await db.query_insert('getpass', {
        username: req.body.Username,
        email_user: req.body.Email,
        date_getpass: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
    });
    let check_num_insertForgetPass = await knex('getpass').select().where({
        email: req.body.Email
    }).andWhere('date_getpass', 'LIKE', dateFormat(new Date(), "dd mm yyyy") + '%')
    if (check_num_insertForgetPass.length > 2) {
        res.send({ mess: 'Bạn đã yêu cầu lấy lại mật khẩu quá nhiều lần trong một ngày. Vui lòng đợi ngày mai!' })
    } else {
        let query_getpass = await db.query_select('user', { name: req.body.Username, email: req.body.Email })
        try {
            send_pass_to_mail.send_pass_to_mail(query_getpass[0].email, crypto.dicipher_pass(query_getpass[0].pass))
            res.redirect('/');
        } catch (error) {
            console.log('Lỗi bảo mật của gmail');
        }
    }
}


exports.save_new_post = async(req, res) => {
    upload.upload(req, res, async(err) => {
        if (err) {
            res.send({ msg: err });
        } else {
            if (req.file != undefined) { file_image = `/images/uploads/${req.file.filename}`; } else { file_image = '' }
            if (req.body.privacy == 'private') { privacy = 1 } else { privacy = 0 }
            let save_post = await db.query_insert('listpost', {
                ID_user: req.session.ID,
                title: req.body.title_post,
                content: req.body.content_post,
                image: file_image,
                privacy: privacy,
                date_post: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            });
            res.redirect('/home');
        }
    });
}

exports.edit_post = async(req, res) => {
    upload.upload(req, res, async(err) => {
        if (err) { res.send({ msg: err }); } else {
            if (req.body.privacy == 'publish') { privacy = 0 } else { privacy = 1 }
            if (req.file != undefined) {
                file_image = `/images/uploads/${req.file.filename}`;
                let save_edit_post = await db.query_update('listpost', { ID: req.body.id_post }, {
                    title: req.body.title_post,
                    content: req.body.content_post,
                    image: file_image,
                    privacy: privacy
                });
                res.redirect('/personel_page');
            } else {
                let save_edit_post = await db.query_update('listpost', { ID: req.body.id_post }, {
                    title: req.body.title_post,
                    content: req.body.content_post,
                    privacy: privacy
                });
                res.redirect('/personel_page');
            }
        }
    });
}

exports.update_info_personel = async(req, res) => {
    upload.avatar_upload(req, res, async(err) => {
        if (err) {
            res.send({ msg: err });
        } else {
            let info_user = await db.query_select('user', { ID: req.session.ID });
            if (req.body.name == '') { name = info_user[0].name; } else { name = req.body.name; }
            if (req.body.email == '') { email = info_user[0].email; } else { email = req.body.email; }
            if (req.body.pass == '') { pass = info_user[0].pass; } else { pass = crypto.crypto_pass(req.body.pass); }
            if (req.body.mobile == '') { mobile = info_user[0].mobile; } else { mobile = req.body.mobile; }
            if (req.body.country == '') { country = info_user[0].country; } else { country = req.body.country; }
            if (req.file == undefined) { file_image = info_user[0].avatar; } else {
                file_image = `/images/avatars/${req.file.filename}`;
                let save_avatar = await db.query_insert('manager_avatar', {
                    ID_user: req.session.ID,
                    image_update: file_image,
                    date_update: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
                });
            }
            let save_post = await db.query_update('user', { ID: req.session.ID }, {
                name: name,
                pass: pass,
                email: email,
                mobile: mobile,
                date_update: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
                avatar: file_image,
                country: country
            });
            res.redirect('/personel_page');
        }
    });
}

exports.comments = async(req, res) => {
    let instert_comments = await db.query_insert('share_like_comment', {
        ID_post: req.body.id_post,
        ID_user: req.session.ID,
        comment: req.body.content_comment,
        type: 1,
        status_like: 0,
        status_notify: 0,
        date_implement: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
    });
    res.redirect(`/info_post/${req.body.id_post}`);
}

exports.submit_contact = async(req, res) => {
    let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.date_post', 'DESC');
    let insert = await db.query_insert('contact', {
        ID_user: req.session.ID,
        email: req.body.email,
        content: req.body.content,
        reply: '',
        type: 0,
        date_contact: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
        date_reply: ''
    })
    res.render('user/contact_reply', {
        username: req.session.username,
        data_10_post: list_10_new_post
    })
}

exports.search = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.date_post', 'DESC');
        let search_user = await db.query_select_andWhere('user', { level: 0 }, 'name', req.body.search);
        let search_post = await db.query_select_andWhere('listpost', { privacy: 0 }, 'content', req.body.search);
        res.render('user/search', {
            username: req.session.username,
            data_10_post: list_10_new_post,
            data_user: search_user,
            data_post: search_post,
            notify: notify.length
        });
    }
}