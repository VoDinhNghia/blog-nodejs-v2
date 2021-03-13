const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const { as } = require("../config/db");

//method get

exports.login = async(req, res) => {
    res.render('user/login');
}

exports.register = async(req, res) => {
    res.render('user/register');
}

exports.forgetpass = async(req, res) => {
    res.render('user/forgetpass');
}

exports.home = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let rows = await db.query_count('listpost', { privacy: 0 });
        let numRows = rows[0].count;
        let numPerPage = 4;
        var numPages = parseInt(Math.ceil(numRows / numPerPage));
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let list_all_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, numPerPage, 0, 'listpost.ID', 'DESC');
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        res.render('user/home', {
            username: req.session.username,
            data: list_all_post,
            data_10_post: list_10_new_post,
            numPages: numPages,
            data_s_l_c: data_s_l_c,
            notify: notify.length
        });
    }
}

exports.pagination_page = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let page = parseInt(req.params.id);
        let numPerPage = 4;
        let skip = (page - 1) * numPerPage;
        let limit = numPerPage;
        let rows = await db.query_count('listpost', { privacy: 0 });
        let numRows = rows[0].count;
        var numPages = parseInt(Math.ceil(numRows / numPerPage));
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let list_all_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, limit, skip, 'listpost.ID', 'DESC');
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        res.render('user/home', {
            username: req.session.username,
            data: list_all_post,
            data_10_post: list_10_new_post,
            numPages: numPages,
            data_s_l_c: data_s_l_c,
            notify: notify.length
        });
    }
}

exports.personel_page = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let data_user = await db.query_select('user', { ID: req.session.ID });
        let data = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'user.ID': req.session.ID });
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.session.ID });
        res.render('user/personel_page', {
            data_user: data_user,
            data: data,
            data_s_l_c: data_s_l_c,
            avatar: avatar,
            notify: notify.length
        });
    }
}

exports.update_avatar = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let avatar = await db.query_select('manager_avatar', { ID: req.params.id });
        let update_avatar = await db.query_update('user', { ID: avatar[0].ID_user }, {
            avatar: avatar[0].image_update,
            date_update: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
        });
        res.redirect('/personel_page')
    }
}

exports.info_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let data_info_post = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.ID': req.params.id })
        res.render('user/info_post', {
            username: req.session.username,
            data_10_post: list_10_new_post,
            data: data_info_post,
            data_s_l_c: data_s_l_c,
            notify: notify.length
        });
    }
}

exports.like = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let query = await db.query_select('share_like_comment', {
            ID_post: req.params.id,
            ID_user: req.session.ID,
            type: 0
        });
        if (query.length > 0) {
            if (query[0].status_like == 0) {
                let query_update = await db.query_update('share_like_comment', {
                    ID_post: req.params.id,
                    ID_user: req.session.ID,
                    type: 0
                }, { status_like: 1 });
            } else {
                let query_update = await db.query_update('share_like_comment', {
                    ID_post: req.params.id,
                    ID_user: req.session.ID,
                    type: 0
                }, { status_like: 0 });
            }
        } else {
            let insert = await db.query_insert('share_like_comment', {
                ID_post: req.params.id,
                ID_user: req.session.ID,
                comment: 'like',
                type: 0, //0: like, 1: comment, 2: share
                status_like: 0, //0: like, 1: bo like
                status_notify: 0, //0 chua xem thong bao, 1 la xem roi
                date_implement: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            })
        }
        res.redirect(`/info_post/${req.params.id}`);
    }
}

exports.edit_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/'); } else {
        //let user_info = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let data_user = await db.query_select('user', { ID: req.session.ID });
        let data_post = await db.query_select('listpost', { ID: req.params.id });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.session.ID });
        res.render('user/edit_post', {
            data_user: data_user,
            data_post: data_post,
            avatar: avatar,
            notify: notify.length
        });
    }
}

exports.delete_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let del_s_l_c = await db.query_delete('share_like_comment', { ID_post: req.params.id });
        let del_post = await db.query_delete('listpost', { ID: req.params.id });
        res.redirect('/personel_page')
    }
}

exports.new_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let user_info = await db.query_select('user', { ID: req.session.ID });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.session.ID });
        res.render('user/new_post', {
            data_user: user_info,
            avatar: avatar,
            notify: notify.length
        });
    }
}

exports.logout = async(req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.info_personel1 = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let data_user = await db.query_select('user', { ID: req.params.id });
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let data = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', {
            'user.ID': req.params.id,
            'listpost.privacy': 0
        });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.params.id });
        res.render('user/info_personel', {
            data_user: data_user,
            data: data,
            avatar: avatar,
            data_s_l_c: data_s_l_c,
            notify: notify.length
        });
    }
}

exports.list_author = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let info_user = await db.query_select('user', { level: 0 });
        res.render('user/list_author', {
            username: req.session.username,
            data_10_post: list_10_new_post,
            data_user: info_user,
            notify: notify.length
        })
    }
}

exports.contact = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        res.render('user/contact', {
            username: req.session.username,
            data_10_post: list_10_new_post,
            notify: notify.length
        })
    }
}

exports.notify_user = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let info_user = await db.query_select('user', '');
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        // query list user
        res.render('user/notify_user', {
            username: req.session.username,
            data_10_post: list_10_new_post,
            notify: notify.length,
            detail_notify: notify,
            info_user: info_user
        });
    }
}

exports.detail_notify = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let update_notify = await db.query_update('share_like_comment', { ID: req.params.id }, {
            status_notify: 1
        });
        res.redirect(`/info_post/${req.params.id_post}`)
    }
}