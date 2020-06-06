const mongoose = require('mongoose')
const db = require('../database/mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      minlength: [4, 'Nome deve ter no mínimo 4 caracteres'],
      unique: [true, 'Já existe uma empresa com esse nome']
    },
    description: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'E-mail é obrigatório'],
      unique: true
    },
    phone: {
      type: Number,
      required: [true, 'Telefone é obrigatório'],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Categoria é obrigatória'],
    },
  }
)

module.exports = db.model('Business', schema)