const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    admin: {type: Boolean, default: false},
    member: {type: Boolean, default: false},
});

module.exports = mongoose.model("Users", userSchema);