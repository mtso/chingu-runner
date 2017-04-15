const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const request = require('request')
const path = require('path')

const port = process.env.PORT || 3750;
const indexPath = path.resolve(__dirname, 'public')

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

  let url = '' // 'https://slack.com/api/oauth.access'
  request.get(url, function(err, result) {
    if (err) {
      return res.send('Error', err)
    }

    _ = result.body.access_token
    res.send('bot added.')
  })
})

app.get('/', function(req, res) {
  res.sendFile(indexPath)
})

app.post('/command', function(req, res) {
  console.log(req.body)
})

app.listen(port, function() {
  console.log('listening on', port)
})
