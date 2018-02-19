let crypto = require('crypto');

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function(salt, pwd) {
    let hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}