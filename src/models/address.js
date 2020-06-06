const mongoose = require('mongoose')
const db = require('../database/mongoose')
const geocoder = require('../helpers/location')

const schema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, 'Logradouro é obrigatório']
    },
    number: {
      type: Number,
      required: [true, 'Número é obrigatório']
    },
    neighborhood: {
      type: String,
      required: [true, 'Bairro é obrigatório']
    },
    observations: {
      type: String
    },
    city_id: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: [true, 'Cidade é obrigatório']
    },
    uf_id: {
      type: Number,
      required: true
    },
    uf: {
      type: String,
      required: [true, 'Estado é obrigatório']
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

schema.pre('save', async function() {
  const location = await geocoder.geocode(`${this.street} ${this.number} ${this.city} ${this.uf}`)
  this.latitude = location[0] ? location[0].latitude : null
  this.longitude = location[0] ? location[0].longitude : null
})

module.exports = db.model('Address', schema)