const commands = require('../commands')

module.exports = function(req, res) {
  let args = req.body.text.split(' ')
  let cmd = commands[args.shift()]

  if (cmd) {
    cmd(req.body, args.join(' '))
      .then((response) => {
        res.json(response)
      })
      .catch(errorResponse => {
        res.json(errorResponse)
      })

  } else {
    // Handle unknown command, print help text
    let d = {
      response_type: 'ephemeral',
      text: 'Available commands are: ' + Object.keys(commands).join(', ')
    }
    return res.json(d)
  }
}
