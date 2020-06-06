const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_MAPS_KEY
}

module.exports = NodeGeocoder(options)