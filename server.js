const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const request = require('request')
const path = require('path')
const morgan = require('morgan')

const port = process.env.PORT || 3750;
const indexPath = path.resolve(__dirname, 'public')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(indexPath))

// mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

let data = {
  response_type: 'in_channel',
  text: 'Hello, world~'
}

app.get('/auth', function(req, res) {
  if (!req.query.code) {
    return res.redirect('/');
  }

  const auth = {
    url: 'https://slack.com/api/oauth.access'
    formData: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code,
    }
  }

  request.post(auth, function(err, resp, body) {
    if (err || resp.statusCode !== 200) {
      return console.error('ERROR', err, resp)
    }
    let token = JSON.parse(body).access_token
    let team = {
      url: 'https://slack.com/api/team.info',
      formData: {token}
    }
    request.post(team, redirectTeam)
  })

  function redirectTeam(err, resp, body) {
    if (err || resp.statusCode !== 200) {
      return console.error('ERROR', err, resp)
    }
    body = JSON.parse(body)
    if (body.error === 'missing_scope') {
      res.send('Chingu Runner added to your team!')
    } else {
      let team = body.team.domain
      res.redirect('https://' + team + '.slack.com')
    }
  }
})

app.get('/', function(req, res) {
  res.sendFile(indexPath)
})

app.post('/command', function(req, res) {
  console.log(req.body)
  res.json(data)
})

app.listen(port, function() {
  console.log('listening on', port)
})
