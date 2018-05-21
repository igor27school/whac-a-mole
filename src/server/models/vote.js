import { YES, NO, ABSENT } from '../../constants/VoteTypes'

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var VoteSchema = new Schema(
  {
    rep: {type: Schema.ObjectId, ref: 'Rep', required: true},
    bill: {type: Schema.ObjectId, ref: 'Bill', required: true},
    outcome: {type: String, required: true, enum: [YES, NO, ABSENT]}
  }
)

VoteSchema
.virtual('url')
.get(function () {
  return '/vote/' + this._id
})

module.exports = mongoose.model('Vote', VoteSchema)
