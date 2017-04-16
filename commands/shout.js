const request = require('request')
const Team = require('../models/Team')

function shout(body, args) {
  return new Promise((resolve, reject) => {

    Team.findOne({_id: body.team_id}, '_id webhook', function(err, team) {
      if (err || !team) {
        return {
          error: 'Team not found.'
        }
      } else {
        request.post({
            url: team.webhook,
            body: { text: '@' + body.user_name + ' shouts HELLO~' },
            json: true
          }
          // Need to change this so that if access is revoked, we remove the team webhook
          , (err, data) => console.log(err, data.body))

        let response = {
          response_type: 'ephemeral',
          text: 'you shouted into the channel!'
        }
        return resolve(response)
      }
    })
  })
}

module.exports = shout;