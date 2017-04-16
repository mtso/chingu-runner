function echo(body, args) {
  let response = {
    response_type: 'ephemeral',
    text: 'Hello, you tried echo on ' + args
  }
  return response
  // if (req.body.text === 'whisper') {
  //   let d = {
  //     response_type: 'ephemeral',
  //     text: 'Hello, world~'
  //   }
  //   return res.json(d)
  // }
}

module.exports = {
  echo
}
