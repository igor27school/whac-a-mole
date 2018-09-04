var mongoose = require('mongoose')

var Schema = mongoose.Schema

var RepSchema = new Schema(
  {
    _id: {type: String, required: true},
    name: {type: String, required: true},
    state: {type: String, required: true},
    link: {type: String, required: true}
  },
  { toObject: { virtuals: true } }
)

RepSchema
.virtual('url')
.get(function () {
  return '/senator/' + this._id
})

module.exports = mongoose.model('Rep', RepSchema)
