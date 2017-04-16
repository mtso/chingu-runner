const request = require('request')
const Team = require('../models/Team')

module.exports = function(req, res) {
  if (!req.query.code) {
    return res.redirect('/');
  }

  const auth = {
    url: 'https://slack.com/api/oauth.access',
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
    body = JSON.parse(body)

    let t = new Team({
      _id: body.team_id,
      webhook: body.incoming_webhook.url
    })
    t.save((err, team) => {
      console.log(err, team)
    })

    let token = body.access_token
    let team = {
      url: 'https://slack.com/api/team.info',
      formData: { token }
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
}
