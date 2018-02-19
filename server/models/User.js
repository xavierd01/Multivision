let mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

let userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    username: {
        type:String, 
        required: '{PATH} is required!',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        let hashToTest = encrypt.hashPwd(this.salt, passwordToMatch);
        return (hashToTest === this.hashed_pwd);
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};
let User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        // set up some test users.
        if (collection.length === 0) {
            let salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'wpaulk');
            User.create({firstName: 'Wil', lastName: 'Paulk', username: 'wpaulk', salt: salt, hashed_pwd: hash, roles: ['admin']});
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ssmith');
            User.create({firstName: 'Scott', lastName: 'Smith', username: 'ssmith', salt: salt, hashed_pwd: hash, roles: []});
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'rjones');
            User.create({firstName: 'Rich', lastName: 'Jones', username: 'rjones', salt: salt, hashed_pwd: hash});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;