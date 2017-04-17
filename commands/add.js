const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')
const User = require('../models/User')
const config = require('../config.json')

function add(body, args) {
  return new Promise((resolve, reject) => {
    if (!args.trim()) {
      let err = new EphemeralError('A title is required to add a new day.')
      return reject(err)
    }

    return checkUser(body)

    // Add user if user doesn't exist
    function checkUser(body) {
      let user = new User({
        _id: body.user_id,
        user_name: body.user_name,
        _team_id: body.team_id,
      })

      user.save(countDays)
    }

    function countDays(err, _) {
      if (err && err.code !== 11000) {
        return reject(new EphemeralError(err))
      }
      Day.where({_user_id: body.user_id})
         .count(handleCount)
    }

    function handleCount(err, count) {
      if (err) {
        return reject(new EphemeralError(err.toString()))
      }

      if (count > config.MAX_DAYS) {
        let response = {
          response_type: 'ephemeral',
          text: 'You can only have ' + config.MAX_DAYS + ' days planned.',
        }
        return reject(response)
      }

      let day = new Day({
        _user_id: body.user_id,
        title: args,
      })

      day.save(handleSave)
    }

    function handleSave(err, data) {
      let response = {
        response_type: 'ephemeral',
        text: 'Added ' + data.title
      }
      resolve(response)
    }
  })
}

module.exports = add;
