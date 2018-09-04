//import { YES, NO, ABSENT } from '../../constants/VoteTypes'

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var VoteSchema = new Schema(
  {
    _id: {type: String, required: true},
    rep: {type: String, ref: 'Rep', required: true},
    bill: {type: String, ref: 'Bill', required: true},
    outcome: {type: String, required: true, enum: ['YES', 'NO', 'ABSENT']},
    link: {type: String, required: true}
  },
  { toObject: { virtuals: true } }
)

VoteSchema
.virtual('url')
.get(function () {
  return '/vote/' + this._id
})

module.exports = mongoose.model('Vote', VoteSchema)
