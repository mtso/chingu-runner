const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')
const path = require('path')
const morgan = require('morgan')

const port = process.env.PORT || 3750;
const indexPath = path.resolve(__dirname, 'public')

const authController = require('./controllers/auth')

let Team = require('./models/Team')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(indexPath))

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

let data = {
  response_type: 'in_channel',
  text: 'Hello, world~'
}

app.get('/auth', authController)

app.get('/', function(req, res) {
  res.sendFile(indexPath)
})

app.post('/command', function(req, res) {
  Team.find({_id: req.body.team_id}, function(err, data) {
    if (err || data.length === 0) {
      return res.json({
        error: 'Team not found.'
      })
    } else {
      res.json(data)
      request.post(data.webhook, {form: {text: req.body.user_name + ' says hello~'}})
    }
  })
  console.log(req.body)
  res.json(data)
})

app.listen(port, function() {
  console.log('listening on', port)
})
