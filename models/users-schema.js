var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const users = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email:{
        type: String,
        unique: true,
        index: { unique: true },
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
    }},
    {collection:"users"});
    
    users.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

//create model that uses schema
module.exports =  mongoose.model('Users',users,'users');