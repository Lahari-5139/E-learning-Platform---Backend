const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require('bson');

// const VideoSchema = new Schema({
//     id: {type: String, required: true},
//     name: { type: String, required: true, unique: true },
// });

const CourseSchema = new Schema({
    // videos : [{ type : ObjectId, ref: 'Video'}],
    name: { type: String, required: true, unique: true },
    master: {type: Schema.Types.ObjectId, required: true, unique: false},
    description: {type: String, required: true},
  });
  
  // const UserPlaylistSchema = new Schema({
  //   playlists: [PlaylistSchema],
  //   _username: { type: String, required: true },
  // });
  
  const Course = mongoose.model('Course', CourseSchema);
  
  module.exports = Course;