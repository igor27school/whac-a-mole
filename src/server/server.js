//server.js
'use strict'

var express = require('express')
var indexRouter = require('./routes/index')

var app = express()

var mongoose = require('mongoose')
var mongoDB = 'mongodb://citizen:keephonest@ds016298.mlab.com:16298/whac-a-mole'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/', indexRouter)

app.listen(3001, function() {
  console.log('api running');
})
