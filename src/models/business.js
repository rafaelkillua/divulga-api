const mongoose = require('mongoose')
const db = require('../database/mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      minlength: [4, 'Nome deve ter no mínimo 4 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'E-mail é obrigatório']
    }
  }
)

module.exports = db.model('Business', schema)