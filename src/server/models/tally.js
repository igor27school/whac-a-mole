var mongoose = require('mongoose')

var Schema = mongoose.Schema

var TallySchema = new Schema(
  {
    _id: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    summary: {type: String, required: true},
    link: {type: String, required: true}
  },
  { toObject: { virtuals: true } }
)

TallySchema
.virtual('url')
.get(function () {
  return '/tally/' + this._id
})

TallySchema
.virtual('formattedDate')
.get(function () {
  const date = new Date(this.date)
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
})

module.exports = mongoose.model('Tally', TallySchema)
