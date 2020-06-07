const mongoose = require('mongoose')
const db = require('../services/mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório']
    }
  },
  {
    timestamps: true
  }
)

module.exports = db.model('Category', schema)