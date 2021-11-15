const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");
const Course =  require("./course");
const { ObjectId } = require('bson');

const MasterSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{type: ObjectId, ref: Course}],
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    // dateOfBirth: Date,
});

const Master = mongoose.model('Master', MasterSchema);

// const validate = (user) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//     });
//     return schema.validate(user);
// };

module.exports = Master;