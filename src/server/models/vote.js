//import { YES, NO, ABSENT } from '../../constants/VoteTypes'

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var VoteSchema = new Schema(
  {
    _id: {type: String, required: true},
    rep: {type: String, ref: 'Rep', required: true},
    tally: {type: String, ref: 'Tally', required: true},
    outcome: {type: String, required: true, enum: ['YES', 'NO', 'ABSENT']}
  },
  { toObject: { virtuals: true } }
)

VoteSchema
.virtual('url')
.get(function () {
  return '/vote/' + this._id
})

module.exports = mongoose.model('Vote', VoteSchema)
