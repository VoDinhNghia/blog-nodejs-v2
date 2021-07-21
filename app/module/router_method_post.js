const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const send_pass_to_mail = require('./send_pass_to_mail');
const fs = require('fs');
const { as } = require("../config/db");

// method post
exports.login_sucsses = async(req, res) => {
    if (req.body.Username.indexOf('@') == -1) { //login username
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
                let update_status = await db.query_update('user', { ID: user_login[0].ID }, { status: 1 });
            }
        } else {
            res.render("user/login", {
                msg: "Username or pass incornect!"
            });
        }
    } else { //login email
        let email_login = await db.query_select('user', { email: req.body.Username, pass: crypto.crypto_pass(req.body.Password) });
        if (email_login.length > 0) {
            req.session.loggedin = true;
            req.session.username = email_login[0].name;
            req.session.ID = email_login[0].ID;
            res.cookie('username', email_login[0].name);
            res.cookie('ID', email_login[0].ID);
            if (email_login[0].level == 1) {
                res.redirect('/admin_home');
            } else {
                res.redirect('/home');
                let update_status = await db.query_update('user', { ID: email_login[0].ID }, { status: 1 });
            }
        } else {
            res.render("user/login", {
                msg: "Username or pass incornect!"
            });
        }
    }
}

exports.signup = async(req, res) => {
    let check_mail = await db.query_count('user', { email: req.body.Email });
    if (check_mail[0].count > 0) {
        res.render('user/register', {
            msg: 'This email already exists'
        });
    } else {
        let signup = await db.query_insert('user', {
            name: req.body.Username,
            email: req.body.Email,
            pass: crypto.crypto_pass(req.body.Password),
            mobile: req.body.Mobile,
            gender: 1,
            level: 0, // user bình thường, nếu 1 là admin
            status: 0, // 1: action, 0: logout
            created_at: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
            date_update: '',
            avatar: '',
            country: req.body.Country
        });
        res.render('user/login', {
            msg: 'Account registration is successful, please login to check'
        })
    }
}

exports.getpass = async(req, res) => {
    let insert_forgetPass = await db.query_insert('getpass', {
        username: req.body.Username,
        email_user: req.body.Email,
        date_getpass: dateFormat(new Date(), "dd mm yyyy HH:MM:ss"),
    });
    let check_num_insertForgetPass = await knex('getpass').select().where({
        email_user: req.body.Email
    }).andWhere('date_getpass', 'LIKE', dateFormat(new Date(), "dd mm yyyy") + '%');
    if (check_num_insertForgetPass.length > 2) {
        res.render('user/forgetpass', {
            msg: 'You have entered more than the specified number of times per day, please wait for tomorrow'
        });
    } else {
        let query_getpass = await db.query_select('user', { name: req.body.Username, email: req.body.Email })
        try {
            if (query_getpass.length > 0) {
                send_pass_to_mail.send_pass_to_mail(query_getpass[0].email, crypto.dicipher_pass(query_getpass[0].pass))
                res.render('user/login', {
                    msg: 'Please check your mail and login again'
                });
            } else {
                res.render('user/register', {
                    msg: 'The account has not been registered, please re-register'
                })
            }
        } catch (error) {
            res.render('user/forgetpass', {
                msg: 'Security error, please go to google account settings page to install the security section'
            })
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
            if (req.body.title_post == '') { title_post = 'Not title' } else { title_post = req.body.title_post }
            let save_post = await db.query_insert('listpost', {
                ID_user: req.session.ID,
                title: title_post,
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
                let find_image_listpost = await db.query_select('listpost', { ID: req.body.id_post });
                fs.unlinkSync('./publish' + find_image_listpost[0].image);
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
            if (req.body.gender == 'Male') { gender = 1 } else if (req.body.gender == 'Female') {
                gender = 0
            } else { gender = info_user[0].gender };
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
                gender: gender,
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
    let avatar_home = await db.query_select('user', { ID: req.session.ID });
    let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
        'user.ID': req.session.ID,
        'share_like_comment.status_notify': 0
    }, { 'share_like_comment.ID_user': req.session.ID });
    let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
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
        avatar_home: avatar_home[0],
        data_10_post: list_10_new_post,
        notify: notify.length
    })
}

exports.search = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let search_user = await db.query_select_andWhere('user', { level: 0 }, 'name', req.body.search);
        let search_post = await db.query_select_andWhere('listpost', { privacy: 0 }, 'content', req.body.search);
        res.render('user/search', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            data_user: search_user,
            data_post: search_post,
            notify: notify.length,
            num_mess: num_mess[0].count
        });
    }
}

exports.search_date = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        //let search_post = await db.query_search_date('listpost', { privacy: 0 }, 'date_post', dateFormat(req.body.search_date, "dd mm yyyy"));
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let data = await db.join_2_table_search('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 'date_post', dateFormat(req.body.search_date, "dd mm yyyy"));
        res.render('user/search_date', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            data: data,
            data_s_l_c: data_s_l_c,
            num_mess: num_mess[0].count,
            date_search: dateFormat(req.body.search_date, "dd mm yyyy")
        });
    }
}

exports.send_message = async(req, res) => {
    //let id_mess = parseInt(`${req.body.id_contact}` + `${req.session.ID}`);
    let inser_mess = await db.query_insert('message', {
        ID_user_send: req.session.ID,
        ID_user_get: req.body.id_contact,
        content_mess: req.body.content_reply,
        status_mess: 0,
        date_mess: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
    });
    res.redirect(`/message`);
}

exports.reply_message = async(req, res) => {
    let update_mess = await db.query_update('message', {
        status_mess: 0,
        ID_user_send: req.body.id_get,
        ID_user_get: req.session.ID
    }, { status_mess: 1 });
    let insert_mess = await db.query_insert('message', {
        ID_user_send: req.session.ID,
        ID_user_get: req.body.id_get,
        content_mess: req.body.content_mess,
        status_mess: 0,
        date_mess: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
    });
    res.redirect(`/mess_of_user/${req.body.id_get}`);
}