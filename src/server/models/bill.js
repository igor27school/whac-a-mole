var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BillSchema = new Schema(
  {
    title: {type: String, required: true},
    summary: {type: String, required: true}
  }
)

BillSchema
.virtual('url')
.get(function () {
  return '/bill/' + this._id
})

module.exports = mongoose.model('Bill', BillSchema)