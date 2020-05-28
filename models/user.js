const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', UserSchema);
