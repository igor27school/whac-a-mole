var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserMarkSchema = new Schema(
  {
    _id: {type: String, required: true},
    vote: {type: String, ref: 'Vote', required: true},
    user: {type: String, ref: 'User', required: true},
    markType: {type: String, required: true, enum: ['MARK_UP', 'MARK_DOWN']},
  }
)

module.exports = mongoose.model('UserMark', UserMarkSchema)
