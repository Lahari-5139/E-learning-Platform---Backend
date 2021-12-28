const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course =  require("./course");
const Master = require("./master");
const { ObjectId } = require('bson');

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses_enrolled: [{type: ObjectId, ref: Course}],
    masters_followed: [{type: ObjectId, ref: Master}],
    courses_fav: [{type: ObjectId, ref: Course}],
    notifications: [{type: String}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;