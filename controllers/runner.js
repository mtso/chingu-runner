const request = require('request')
const Team = require('../models/Team')

const commands = require('./commands')

module.exports = function(req, res) {

  let text = req.body.text.split(' ')
  let cmd = commands[text.shift()]
  if (cmd) {
    // let opts = {
    //   team_id: req.body
    // }
    let response = cmd(req.body, text.join(' '))
    return res.json(response)
  } else {
    let d = {
      response_type: 'ephemeral',
      text: 'Available commands are: ' + Object.keys(commands).join()
    }
    return res.json(d)
  }

  // if (req.body.text === 'whisper') {
  //   let d = {
  //     response_type: 'ephemeral',
  //     text: 'Hello, world~'
  //   }
  //   return res.json(d)
  // }
  //
  //
  // Team.findOne({_id: req.body.team_id}, '_id webhook', function(err, team) {
  //   if (err || !team) {
  //     return res.json({
  //       error: 'Team not found.'
  //     })
  //   } else {
  //
  //
  //     request.post({
  //       url: team.webhook,
  //       body: { text: req.body.user_name + ' says hello~' },
  //       json: true
  //     }, (err, data) => console.log(err, data.body)) // Need to change this so that if access is revoked, we remove the team webhook
  //     res.json(data)
  //
  //   }
  // })
}
