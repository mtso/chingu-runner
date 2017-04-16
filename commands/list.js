const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')

const MAX_DAYS = 30;

function list(body, args) {
  return new Promise((resolve, reject) => {
    Day
      .find({_user_id: body.user_id})
      .sort({created_at: 1})
      .exec((err, data) => {
        if (err) {
          let error = new EphemeralError(err.toString())
          return reject(error)
        }
        let previousDone = true;
        let days = data.map(d => {
          let box = d.done ? '[X]' : '[ ]'
          let markToday = (previousDone && !d.done) ? ' (Today)' : ''
          previousDone = d.done
          return box + ' ' + d.title + markToday
        }).join('\n')
        let response = {
          response_type: 'ephemeral',
          text: '```' + days + '```',
          mrkdn: true,
        }
        resolve(response)
      })
  })
}

module.exports = list;
