const add = require('./add')
const list = require('./list')
const done = require('./done')

// Slack API test commands
const echo = require('./echo')
const shout = require('./shout')

module.exports = {
  add,
  list,
  done,

  echo,
  shout,
}
