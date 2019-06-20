var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BillSchema = new Schema(
  {
    _id: {type: String, required: true},
    title: {type: String, required: true},
    link: {type: String, required: true}
  },
  { toObject: { virtuals: true } }
)

BillSchema
.virtual('url')
.get(function () {
  return '/bill/' + this._id
})

module.exports = mongoose.model('Bill', BillSchema)
