const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')

const MAX_DAYS = 29;

function add(body, args) {
  return new Promise((resolve, reject) => {
    var days = Day.where({user_id: body.user_id}).count()

    if (!args.trim()) {
      let err = new EphemeralError('A title is required to add a new day.')
      return reject(err)
    }

    if (days > MAX_DAYS) {
      let response = {
        response_type: 'ephemeral',
        text: 'You can only have ' + MAX_DAYS + ' days planned.',
      }
      return reject(response)
    }

    let day = new Day({
      _user_id: body.user_id,

    })

    let response = {
      response_type: 'ephemeral',
      text: 'Hello, you tried echo on ' + args
    }
    return resolve(response)
  })
}

module.exports = add;
