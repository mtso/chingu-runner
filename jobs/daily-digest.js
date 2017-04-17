const Team = require('../models/Team')
const User = require('../models/User')
const Day = require('../models/Day')

// get team webhooks
// get users that belong to a team
// for each user, get the last 3 tasks that they completed today
// compile daily digest
// for each team, make post request

function findTeams() {

}

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
