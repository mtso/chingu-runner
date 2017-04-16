const request = require('supertest')
const expect = require('chai').expect
const app = require('../server')

describe('command add', function() {
  it('should return an error for an empty title', function(done) {
    request(app)
      .post('/command')
      .set('Content-Type', 'application/json')
      .send('{"user_id":"U4PDPJQ4X","text":"add"}')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        let body = res.body
        expect(body.response_type).to.eq('ephemeral')
        expect(body.text).to.eq('A title is required to add a new day.')
        done()
      })
  })
})
