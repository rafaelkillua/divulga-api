const mongoose = require('mongoose')
const db = require('../database/mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      minlength: [4, 'Nome deve ter no mínimo 4 caracteres'],
      maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
    },
    description: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
      minlength: [10, 'Descrição deve ter no mínimo 10 caracteres'],
      maxlength: [100, 'Descrição deve ter no máximo 100 caracteres']
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
  },
  {
    timestamps: true
  }
)

schema.index({
  name: 'text',
  description: 'text'
})

module.exports = db.model('Business', schema)