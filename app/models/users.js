// USER SCHEMA
const mongoose = require( 'mongoose' );
const crypto = require('crypto');

const resultSchema = new mongoose.Schema({ 
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    results: {
        type: [Boolean],
        required: true
    }
}); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ["Educator", "Student"]
    },
    hash: String,
    salt: String,
    results: [resultSchema]
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

const User = mongoose.model('User', userSchema);

module.exports = User;