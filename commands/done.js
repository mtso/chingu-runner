const request = require('request')
const Team = require('../models/Team')
const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')

function done(body, args) {
  // If no args, complete today's item
  // else try to find item with id
  return new Promise((resolve, reject) => {
    var today;
    // Don't handle id targeting yet
    // if (!args.trim()) {
    Day
      .find({_user_id: body.user_id, isDone: false})
      .sort({created_at: 1})
      .exec(handleFound)

    function handleFound(err, data) {
      if (err) {
        return reject(new EphemeralError(err))
      }
      today = data[0]
      if (!today) {
        return reject(new EphemeralError('You have no incomplete items.'))
      }
      let update = {
        isDone: true,
        completed_at: Date.now(),
      }
      Day.update({_id: today._id}, update, handleUpdate)
    }

    function handleUpdate(err, data) {
      if (err) {
        return reject(new EphemeralError(err))
      }
      let response = {
        response_type: 'ephemeral',
        text: 'You finished ' + today.title + '!'
      }
      resolve(response)
      // Comment out to try daily digest.
      // Team.findOne({_id: body.team_id}, 'webhook', postCompletion)
    }

    function postCompletion(err, team) {
      // Team is null here when in local dev env.
      if (err || !team) {
        return console.error(err)
      }

      request.post({
          url: team.webhook,
          body: {
            text: '<@' + body.user_name + '> finished today!',
            link_names: true,
          },
          json: true,
        }
        // Need to change this so that if access is revoked, we remove the team webhook
        , (err, data) => console.log(err, data.body)
      )
    }
    // }
  })
}

module.exports = done;
