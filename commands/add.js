const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')
const EphemeralMessage = require('../utils/ephemeral-message')
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
      let userInfo = {
        _id: body.user_id,
        user_name: body.user_name,
        _team_id: body.team_id,
      }
      User.update({_id: body.user_id}, userInfo, {upsert: true}, countDays)
    }

    function countDays(err, _) {
      if (err) {
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
        let text = 'You can only have ' + config.MAX_DAYS + ' days planned.';
        let response = new EphemeralMessage(text)
        return reject(response)
      }

      let day = new Day({
        _user_id: body.user_id,
        title: args,
        isDone: false,
      })
      day.save(handleSave)
    }

    function handleSave(err, data) {
      let response = new EphemeralMessage('Added ' + data.title)
      resolve(response)
    }
  })
}

module.exports = add;
