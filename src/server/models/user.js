var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema(
  {
    _id: {type: String, required: true},
    name: {type: String, required: true},
    picture: {type: String, required: true},
  },
  { toObject: { virtuals: true } }
)

UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
