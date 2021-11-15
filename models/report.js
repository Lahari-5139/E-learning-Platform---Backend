const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('bson');

const ReportSchema = new Schema({
    userRef: { type: ObjectId, required: true},
    description: { type: String, required: true},
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;