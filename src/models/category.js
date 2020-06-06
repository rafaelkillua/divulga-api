const mongoose = require('mongoose')
const db = require('../database/mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório']
    }
  }
)

module.exports = db.model('Category', schema)