const dateFormat = require('dateformat');
const path = require('path');
const multer = require('multer');

//load file image post
const storage = multer.diskStorage({
    destination: './publish/images/uploads/',
    filename: function(req, file, cb) {
        let date_up = dateFormat(new Date(), "dd-mm-yyyy");
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, date_up + '-' + file.originalname);
    }
})

//load file avatar
const storage_avatar = multer.diskStorage({
    destination: './publish/images/avatars/',
    filename: function(req, file, cb) {
        let date_up = dateFormat(new Date(), "dd-mm-yyyy");
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, date_up + '-' + file.originalname);
    }
})


function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image_file');

exports.avatar_upload = multer({
    storage: storage_avatar,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image_file_avatar');