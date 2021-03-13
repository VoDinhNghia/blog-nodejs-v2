const express = require('express');
const app = express();
const { render } = require('ejs');
require('./app/config/global');

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('publish'));
app.use(express.static(__dirname + '/publish'));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//var bcrypt = require('bcrypt');
var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

const router_method_get = require('./app/module/router_method_get');
const router_method_post = require('./app/module/router_method_post');
const router_method_get_admin = require('./app/module/router_method_get_admin');
const router_method_post_admin = require('./app/module/router_method_post_admin');

//method get
app.get('/', router_method_get.login);
app.get('/register', router_method_get.register);
app.get('/forgetpass', router_method_get.forgetpass);
app.get('/home', router_method_get.home);
app.get('/personel_page', router_method_get.personel_page);
app.get('/new_post', router_method_get.new_post);
app.get('/logout', router_method_get.logout);
app.get('/info_personel/:id', router_method_get.info_personel1);
app.get('/pagination_page/:id', router_method_get.pagination_page);
app.get('/info_post/:id', router_method_get.info_post);
app.get('/like/:id', router_method_get.like);
app.get('/edit_post/:id', router_method_get.edit_post);
app.get('/delete_post/:id', router_method_get.delete_post);
app.get('/update_avatar/:id', router_method_get.update_avatar);
app.get('/list_author', router_method_get.list_author);
app.get('/contact', router_method_get.contact);
app.get('/notify_user', router_method_get.notify_user);
app.get('/detail_notify/:id_post/:id', router_method_get.detail_notify);

//method post
app.post('/login-sucsses', router_method_post.login_sucsses);
app.post('/signup', router_method_post.signup);
app.post('/getpass', router_method_post.getpass);
app.post('/save_new_post', router_method_post.save_new_post);
app.post('/update_info_personel', router_method_post.update_info_personel);
app.post('/comments', router_method_post.comments);
app.post('/edit_post', router_method_post.edit_post);
app.post('/submit_contact', router_method_post.submit_contact);
app.post('/search', router_method_post.search);

//method get of admin
app.get('/admin_home', router_method_get_admin.home_admin);
app.get('/notify_contact', router_method_get_admin.notify_contact);

//method post of admin
app.post('/reply_contact', router_method_post_admin.reply_contact);

//error: page not found 404/
app.use((req, res, next) => {
    let err = new Error('Page not found.');
    err.status = 404;
    next(err);
});
//handling error
app.use((err, req, res, next) => {
    res.status(err.status | 500);
    res.send(err.message);
});
let port = require('./app/config/config').port;
const server = app.listen(port, function() {
    const host = server.address().port;
    console.log("Server on port: " + host);
});