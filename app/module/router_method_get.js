const { render } = require("ejs");
const knex = require('../config/db');
const db = require('./controler');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');
const upload = require('./upload_file');
const crypto = require('./crypto');
const { as } = require("../config/db");
const fs = require('fs');

//method get

exports.login = async(req, res) => {
    res.render('user/login', {
        msg: 'Please fill in the fields below'
    });
}

exports.register = async(req, res) => {
    res.render('user/register', {
        msg: 'Please fill in the fields below'
    });
}

exports.forgetpass = async(req, res) => {
    res.render('user/forgetpass', {
        msg: 'Please fill in the fields below'
    });
}

exports.home = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
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
            avatar_home: avatar_home[0],
            data: list_all_post,
            data_10_post: list_10_new_post,
            numPages: numPages,
            data_s_l_c: data_s_l_c,
            notify: notify.length,
            num_mess: num_mess[0].count
        });
    }
}

exports.pagination_page = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
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
            avatar_home: avatar_home[0],
            data: list_all_post,
            data_10_post: list_10_new_post,
            numPages: numPages,
            data_s_l_c: data_s_l_c,
            notify: notify.length,
            num_mess: num_mess[0].count
        });
    }
}

exports.personel_page = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let data_user = await db.query_select('user', { ID: req.session.ID });
        let data = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'user.ID': req.session.ID });
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'manager_avatar.ID_user': req.session.ID });
        res.render('user/personel_page', {
            avatar_home: avatar_home[0],
            data_user: data_user,
            data: data,
            data_s_l_c: data_s_l_c,
            avatar: avatar,
            notify: notify.length,
            num_mess: num_mess[0].count
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

exports.delete_avatar_main = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let path = await db.query_select('user', { ID: req.params.id });
        fs.unlinkSync('./publish' + path[0].avatar);
        let avatar = await db.query_delete('manager_avatar', { image_update: path[0].avatar });
        let find_manager_to_update = await db.query_select('manager_avatar', { ID_user: req.params.id });
        if (find_manager_to_update.length > 0) {
            let update_avatar = await db.query_update('user', { ID: req.params.id }, { avatar: find_manager_to_update[0].image_update });
        } else {
            let update_avatar = await db.query_update('user', { ID: req.params.id }, { avatar: '' });
        }

        res.redirect('/personel_page');
    }
}

exports.delete_avatar = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let path = await db.query_select('manager_avatar', { ID: req.params.id });
        fs.unlinkSync('./publish' + path[0].image_update);
        let avatar = await db.query_delete('manager_avatar', { ID: req.params.id });
        res.redirect('/personel_page')
    }
}

exports.info_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        let data_info_post = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.ID': req.params.id, 'listpost.privacy': 0 })
        res.render('user/info_post', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            data: data_info_post,
            data_s_l_c: data_s_l_c,
            notify: notify.length,
            num_mess: num_mess[0].count
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

exports.share = async(req, res) => {
    //share qua face, zalo, youtube ... nhan vao nut share => select noi minh muon share den
    res.send({ msg: 'share to facebook or zalo or personel page' });
    //res.redirect(`/info_post/${req.params.id}`);
}

exports.edit_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/'); } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let data_user = await db.query_select('user', { ID: req.session.ID });
        let data_post = await db.query_select('listpost', { ID: req.params.id });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.session.ID });
        res.render('user/edit_post', {
            avatar_home: avatar_home[0],
            data_user: data_user,
            data_post: data_post,
            avatar: avatar,
            notify: notify.length,
            num_mess: num_mess[0].count
        });
    }
}

exports.delete_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let del_s_l_c = await db.query_delete('share_like_comment', { ID_post: req.params.id });
        let find_image_listpost = await db.query_select('listpost', { ID: req.params.id });
        if (find_image_listpost[0].image != '') {
            fs.unlinkSync('./publish' + find_image_listpost[0].image);
        }
        let del_post = await db.query_delete('listpost', { ID: req.params.id });
        res.redirect('/personel_page')
    }
}

exports.new_post = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let user_info = await db.query_select('user', { ID: req.session.ID });
        let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.session.ID });
        res.render('user/new_post', {
            avatar_home: avatar_home[0],
            data_user: user_info,
            avatar: avatar,
            notify: notify.length,
            num_mess: num_mess[0].count
        });
    }
}

exports.logout = async(req, res) => {
    let update_status_user = await db.query_update('user', { ID: req.session.ID }, { status: 0 });
    req.session.destroy();
    res.redirect('/');
}

exports.info_personel1 = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) {
        res.redirect('/');
    } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        if (req.session.ID == req.params.id) {
            res.redirect('/personel_page');
        } else {
            let data_user = await db.query_select('user', { ID: req.params.id });
            let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
            let data = await db.join_2_table('user', 'listpost', 'user.ID', 'listpost.ID_user', {
                'user.ID': req.params.id,
                'listpost.privacy': 0
            });
            let avatar = await db.join_2_table('user', 'manager_avatar', 'user.ID', 'manager_avatar.ID_user', { 'user.ID': req.params.id });
            let follow = await db.join_2_table('manager_follow', 'user', 'manager_follow.ID_user_followed', 'user.ID', {
                'manager_follow.ID_user_follow': req.session.ID,
                'manager_follow.ID_user_followed': req.params.id,
                'manager_follow.status_follow': 1
            });
            res.render('user/info_personel', {
                avatar_home: avatar_home[0],
                data_user: data_user,
                data: data,
                avatar: avatar,
                data_s_l_c: data_s_l_c,
                notify: notify.length,
                follow: follow,
                num_mess: num_mess[0].count
            });
        }
    }
}

exports.follow = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let follow = await db.join_2_table('manager_follow', 'user', 'manager_follow.ID_user_followed', 'user.ID', {
            'manager_follow.ID_user_follow': req.session.ID,
            'manager_follow.ID_user_followed': req.params.id,
            'manager_follow.status_follow': 0
        });
        if (follow.length > 0) {
            let update_follow = await db.query_update('manager_follow', { ID_user_follow: req.session.ID, ID_user_followed: req.params.id }, {
                status_follow: 1,
                date_follow: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            });
        } else {
            let insert_follow = await db.query_insert('manager_follow', {
                ID_user_follow: req.session.ID,
                ID_user_followed: req.params.id,
                status_follow: 1,
                date_follow: dateFormat(new Date(), "dd mm yyyy HH:MM:ss")
            });
        }
        res.redirect(`/info_personel/${req.params.id}`)
    }
}

exports.remove_follow = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let del_follow = await db.query_update('manager_follow', { ID_user_follow: req.session.ID, ID_user_followed: req.params.id }, {
            status_follow: 0
        });
        res.redirect(`/info_personel/${req.params.id}`)
    }
}

exports.manager_folow = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let post_user_follow = await db.join_3_table('manager_follow', 'user', 'listpost', 'manager_follow.ID_user_followed', 'user.ID', 'user.ID', 'listpost.ID_user', {
            'manager_follow.ID_user_follow': req.session.ID,
            'manager_follow.status_follow': 1
        }, '');
        let data_s_l_c = await db.join_2_table('user', 'share_like_comment', 'user.ID', 'share_like_comment.ID_user', { 'share_like_comment.status_like': 0 });
        res.render('user/manager_follow', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            data: post_user_follow,
            data_s_l_c: data_s_l_c,
            num_mess: num_mess[0].count
        });
    }
}

exports.list_you_following = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_follow = await db.join_2_table('manager_follow', 'user', 'manager_follow.ID_user_followed', 'user.ID', {
            'manager_follow.ID_user_follow': req.session.ID,
            'manager_follow.status_follow': 1
        });
        res.render('user/list_you_following', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            list_follow: list_follow,
            num_mess: num_mess[0].count
        })
    }
}

exports.list_following_you = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_user_follow = await db.join_2_table('manager_follow', 'user', 'manager_follow.ID_user_follow', 'user.ID', {
            'manager_follow.ID_user_followed': req.session.ID,
            'manager_follow.status_follow': 1
        });
        res.render('user/list_following_you', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            list_user_follow: list_user_follow,
            num_mess: num_mess[0].count
        })
    }
}

exports.list_author = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let info_user = await db.query_select_whereNot('user', { level: 0 }, { ID: req.session.ID });
        res.render('user/list_author', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            data_user: info_user,
            notify: notify.length,
            num_mess: num_mess[0].count
        })
    }
}

exports.contact = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        res.render('user/contact', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            num_mess: num_mess[0].count
        })
    }
}

exports.notify_user = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let info_user = await db.query_select('user', '');
        let list_10_new_post = await db.query_select_limit('user', 'listpost', 'user.ID', 'listpost.ID_user', { 'listpost.privacy': 0 }, 10, 0, 'listpost.ID', 'DESC');
        // query list user
        res.render('user/notify_user', {
            avatar_home: avatar_home[0],
            data_10_post: list_10_new_post,
            notify: notify.length,
            detail_notify: notify,
            info_user: info_user,
            num_mess: num_mess[0].count
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

exports.message = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 0
        });
        let all_user_mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 1
        });
        let mess_send = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_get', {
            'message.ID_user_send': req.session.ID,
            'message.status_mess': 0
        });
        res.render('user/message', {
            avatar_home: avatar_home[0],
            notify: notify.length,
            detail_notify: notify,
            num_mess: num_mess[0].count,
            mess: mess,
            mess_send: mess_send,
            all_user_mess: all_user_mess
        });
    }
}

exports.mess_of_user = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 0
        });
        let all_user_mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 1
        });
        let mess_user = await db.query_orwhere_2table('user', 'message', 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.ID_user_send': req.params.id,
        }, {
            'message.ID_user_send': req.session.ID,
            'message.ID_user_get': req.params.id,
        });
        res.render('user/message_user', {
            avatar_home: avatar_home[0],
            notify: notify.length,
            detail_notify: notify,
            num_mess: num_mess[0].count,
            mess: mess,
            mess_user: mess_user,
            all_user_mess: all_user_mess
        });
    }
}

exports.detail_mess_send = async(req, res) => {
    if (!req.session.username || req.session.ID == 3) { res.redirect('/') } else {
        let num_mess = await db.query_count('message', { ID_user_get: req.session.ID, status_mess: 0 });
        let avatar_home = await db.query_select('user', { ID: req.session.ID });
        let notify = await db.join_3_table('user', 'listpost', 'share_like_comment', 'user.ID', 'listpost.ID_user', 'listpost.ID', 'share_like_comment.ID_post', {
            'user.ID': req.session.ID,
            'share_like_comment.status_notify': 0
        }, { 'share_like_comment.ID_user': req.session.ID });
        let mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 0
        });
        let mess_user = await db.join_2_table('user', 'message', 'user.ID', 'message.ID_user_get', {
            'message.ID_user_send': req.session.ID,
            'message.ID_user_get': req.params.id
        });
        let all_user_mess = await db.query_distinct_select('user', 'message', [
            'message.ID_user_send', 'user.ID', 'user.avatar', 'user.status', 'user.name'
        ], 'user.ID', 'message.ID_user_send', {
            'message.ID_user_get': req.session.ID,
            'message.status_mess': 1
        });
        res.render('user/message_send_user', {
            avatar_home: avatar_home[0],
            notify: notify.length,
            detail_notify: notify,
            num_mess: num_mess[0].count,
            mess: mess,
            mess_user: mess_user,
            all_user_mess: all_user_mess
        });
    }
}