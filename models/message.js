const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema =  new Schema({
    name: {type: String, required: true},
    user_id: {type:String, require: true},
    text: {type: String, required: true},
    room_id: {type: String, required: true},
}, 
{ timestamps: true });

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;