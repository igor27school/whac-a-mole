var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserVoteSchema = new Schema(
  {
    voteId: {type: String, required: true},
    userId: {type: String, required: true},
    voteType: {type: String, required: true, enum: ['VOTE_UP', 'VOTE_DOWN']},
  }
)

module.exports = mongoose.model('UserVote', UserVoteSchema)
