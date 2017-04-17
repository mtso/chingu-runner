const request = require('request')
const mongoose = require('mongoose')

const Team = require('../models/Team')
const User = require('../models/User')
const Day = require('../models/Day')

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI)

function sendDigest() {
  let now = new Date()
  let midnight = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  let fallbackDate = [now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCFullYear()].join('/')

  console.log('Sending daily digest.', now)

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

                let timestamp = Math.floor(Date.now() / 1000)
                let dateString = '<!date^' + timestamp + '^{date_short}|' + fallbackDate + '>'
                let digest = ['Runner\'s Digest | ' + dateString +':'];
                digest = digest.concat(userText).join('\n')

                request.post({
                  url: team.webhook,
                  body: {
                    text: digest,
                    link_names: true,
                  },
                  json: true,
                }, (err, result) => {
                  if (err || !result.body === 'ok') {
                    console.error(err)
                  }
                })
              })
            })
        })
    })
}

sendDigest()

setInterval(_ => {
  process.exit()
}, 30 * 1000);
