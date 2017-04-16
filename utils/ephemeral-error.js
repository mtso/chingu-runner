function EphemeralError(message) {
  this.response_type = 'ephemeral'
  this.text = message
}

module.exports = EphemeralError;
