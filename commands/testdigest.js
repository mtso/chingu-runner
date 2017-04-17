const Team = require('../models/Team')
const User = require('../models/User')
const Day = require('../models/Day')

const EphMessage = require('../utils/ephemeral-message')

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
  sendDigestForTeam({_id: 'dev_team'})
  return new Promise((resolve, reject) => {
    Team
      .find({})
      .exec((err, teams) => {
        // console.log(err, teams)

        teams.forEach(sendDigestForTeam)
      })
    resolve(new EphMessage('received command'))
  })
}

function sendDigestForTeam(team) {
  User.find({_team_id: team._id})
    .exec((err, users) => {
      console.log(users)

      users.forEach(findDays)
    })
}

function findDays(user) {
  let now = new Date()
  let midnight = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())

  let data = {};

  Day.find({_user_id: user._id, completed_at: { $gte: midnight }})
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

              console.log(days, teamIds, users)

              teams.forEach((team) => {
                let dataTeam = data[team._id] = {}
                dataTeam.webhook = team.webhook
                dataTeam.users = users.filter(u => u._team_id === team._id)

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
