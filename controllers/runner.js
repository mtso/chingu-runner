const commands = require('../commands')

module.exports = function(req, res) {
  let args = req.body.text.split(' ')
  let cmd = commands[args.shift()] || commands['help']

  cmd(req.body, args.join(' '))
    .then((response) => {
      res.json(response)
    })
    .catch(errorResponse => {
      res.json(errorResponse)
    })
}
