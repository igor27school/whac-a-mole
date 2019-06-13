var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserVoteSchema = new Schema(
  {
    vote: {type: String, ref: 'Vote', required: true},
    user: {type: String, ref: 'User', required: true},
    voteType: {type: String, required: true, enum: ['VOTE_UP', 'VOTE_DOWN']},
  }
)

module.exports = mongoose.model('UserVote', UserVoteSchema)
