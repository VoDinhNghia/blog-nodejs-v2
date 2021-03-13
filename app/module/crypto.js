const crypto = require('crypto');

exports.crypto_pass = function(pass) {
    const cipher = crypto.createCipher('aes128', 'a password');
    var password = cipher.update(pass, 'utf8', 'hex');
    password += cipher.final('hex');
    return password
}

exports.dicipher_pass = function(pass) {
    const decipher = crypto.createDecipher('aes128', 'a password');
    var decrypted = decipher.update(pass, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}