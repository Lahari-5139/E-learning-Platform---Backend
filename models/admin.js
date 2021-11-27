const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");

const AdminSchema = new Schema({
    adminname: { type: String, required: true},
    adminemail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notifications: [{type: String}],
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;