const request = require('request')
const EphMessage = require('../utils/ephemeral-message')

const Team = require('../models/Team')
const User = require('../models/User')
const Day = require('../models/Day')

/*
let DigestData = {
  '_team_id': {
    'user_id': ['done title'],
    'user_id': ['done title']
  },
  '_team_id': {
    'user_id': ['done title'],
    'user_id': ['done title']
  },
}

get all items completed today
get user info for items completed
add user items to each team in data
get webhooks
for each webhook
send digest
*/

// get team webhooks
// get users that belong to a team
// for each user, get the last 3 tasks that they completed today
// compile daily digest
// for each team, make post request

function testdigest() {
  // sendDigestForTeam({_id: 'dev_team'})
  findDays()
  return new Promise((resolve, reject) => {

    // Team
    //   .find({})
    //   .exec((err, teams) => {
    //     // console.log(err, teams)
    //
    //     teams.forEach(sendDigestForTeam)
    //   })
    resolve(new EphMessage('received command'))
  })
}

// function sendDigestForTeam(team) {
//   User.find({_team_id: team._id})
//     .exec((err, users) => {
//       console.log(users)
//
//       users.forEach(findDays)
//     })
// }

function findDays() {
  let now = new Date()
  let midnight = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  let fallbackDate = [now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCFullYear()].join('/')

  Day.find({completed_at: { $gte: midnight }})
    .exec((err, days) => {

      let userIds = days.map(d => d._user_id)
      User.find({_id: {$in: userIds}})
        .exec((err, users) => {

          let teamIds = users.reduce((bucket, u) => {
            bucket[u._team_id] = true
            return bucket
          }, {})
          teamIds = Object.keys(teamIds)

          Team.find({_id: {$in: teamIds}})
            .exec((err, teams) => {

              teams.forEach((team) => {
                let userText = users
                  .filter(u => u._team_id === team._id)
                  .map((u) => {
                    let daysForUser = days.filter(d => d._user_id === u._id)
                                          .slice(0, 3)
                                          .map(d => d.title)
                    return '<@' + u.user_name + '> finished: ' + daysForUser.join(', ')
                  })

                let dateString = '<!date^' + Date.now() + '^{date_short}|' + fallbackDate + '>'
                let digest = ['Runner\'s Digest | ' + dateString +':'];
                digest = digest.concat(userText).join('\n')
                console.log(fallbackDate, team.webhook, digest)

                request.post({
                  url: team.webhook,
                  body: {
                    text: digest,
                    link_names: true,
                  },
                  json: true,
                }, (err, result) => console.log(err, result.body))
              })
            })
        })
    })
}

// Format:
// On March 31, 2017
// @mtso completed: Research Slack
// @jonathanmaddison: Learn react
// @ecccs: Learn Angular, complete recipe box

// request.post({
//     url: team.webhook,
//     body: {
//       text: '@' + body.user_name + ' finished today!',
//       link_names: true,
//     },
//     json: true,
//   }
//   // Need to change this so that if access is revoked, we remove the team webhook
//   , (err, data) => console.log(err, data.body)
// )

module.exports = testdigest
