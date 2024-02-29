const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    member: {type: Boolean, default: false}
});

module.exports = mongoose.model("Users", userSchema);