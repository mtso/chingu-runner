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
  Team.findOne({_id: req.body.team_id}, '_id webhook', function(err, team) {
    if (err || !team) {
      return res.json({
        error: 'Team not found.'
      })
    } else {
      res.json(data)
      console.log('POSTING', team)
      // request.post(team.webhook, {form: {text: req.body.user_name + ' says hello~'}})
      request.post({
        url: team.webhook,
        formData: { text: req.body.user_name + ' says hello~' }
      }, (err, data) => console.log(err, data))
    }
  })
})

app.listen(port, function() {
  console.log('listening on', port)
})
