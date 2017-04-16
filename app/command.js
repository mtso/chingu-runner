let run = require('./runner')

module.exports = function(req, res) {

  let text = req.body.text.split(' ')
  let command = text.unshift()
  let cmd = run[command]
  if (cmd) {
    return cmd(text.join(' '))
  }
}
