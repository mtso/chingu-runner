const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')
const User = require('../models/User')

const MAX_DAYS = 30;

function checkUser(body, callback) {
  let user = new User({
    _id: body.user_id,
    user_name: body.user_name,
    _team_id: body.team_id,
  })

  user.save((err, data) => {
    callback(err, data)
  })
}

function add(body, args) {
  // Add user if user doesn't exist
  return new Promise((resolve, reject) => {
    checkUser(body, (err, data) => {
      if (err) {
        reject(new EphemeralError(err))
      }

      if (!args.trim()) {
        let err = new EphemeralError('A title is required to add a new day.')
        return reject(err)
      }

      Day.where({_user_id: body.user_id})
         .count(handleCount)

      function handleCount(err, count) {
        if (err) {
          console.log(err)
          return reject(new EphemeralError(err.toString()))
        }

        if (count > MAX_DAYS) {
          let response = {
            response_type: 'ephemeral',
            text: 'You can only have ' + MAX_DAYS + ' days planned.',
          }
          return reject(response)
        }

        let day = new Day({
          _user_id: body.user_id,
          title: args,
        })

        day.save((err, data) => {
          let response = {
            response_type: 'ephemeral',
            text: 'Added ' + data.title
          }
          resolve(response)
        })
      }
    })
  })
}

module.exports = add;
