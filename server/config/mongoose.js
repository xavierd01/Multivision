let mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    let userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            let hashToTest = hashPwd(this.salt, passwordToMatch);
            return (hashToTest === this.hashed_pwd);
        }
    }
    let User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        // set up some test users.
        if (collection.length === 0) {
            let salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'wpaulk');
            User.create({firstName: 'Wil', lastName: 'Paulk', userName: 'wpaulk', salt: salt, hashed_pwd: hash, roles: ['admin']});
            
            salt = createSalt();
            hash = hashPwd(salt, 'ssmith');
            User.create({firstName: 'Scott', lastName: 'Smith', userName: 'ssmith', salt: salt, hashed_pwd: hash, roles: []});
            
            salt = createSalt();
            hash = hashPwd(salt, 'rjones');
            User.create({firstName: 'Rich', lastName: 'Jones', userName: 'rjones', salt: salt, hashed_pwd: hash});
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    let hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}