const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')

const port = process.env.PORT || 3750;
const indexPath = path.resolve(__dirname, 'public')

const authController = require('./controllers/auth')
const runController = require('./controllers/runner')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(indexPath))

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

app.get('/auth', authController)

app.get('/', function(req, res) {
  res.sendFile(indexPath)
})

app.post('/command', runController)

app.listen(port, function() {
  console.log('listening on', port)
})

module.exports = app;
