var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BillSchema = new Schema(
  {
    _id: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    summary: {type: String, required: true},
    link: {type: String, required: true}
  },
  { toObject: { virtuals: true } }
)

BillSchema
.virtual('url')
.get(function () {
  return '/bill/' + this._id
})

BillSchema
.virtual('formattedDate')
.get(function () {
  const date = new Date(this.date)
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
})

module.exports = mongoose.model('Bill', BillSchema)
