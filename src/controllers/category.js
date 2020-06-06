const Category = require('../models/category')
const { getMongooseErrors } = require('../helpers/errors')

module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body
      const data = {
        name
      }
      const category = new Category(data)
      await category.validate()
      await category.save()
      
      return res.status(200).json(category)
    } catch (error) {
      return res.status(400).json({
        error: 'CATEGORY_CREATE',
        message: 'Houve um erro ao cadastrar uma categoria',
        fields: getMongooseErrors(error)
      })
    }
  },

  findAll: async (req, res) => {
    try {
      const { name } = req.query
      const where = {}
      if (name) where.name = new RegExp(name, 'i')
      
      const categories = await Category.find(where, null, {
        sort: 'name'
      })
      
      return res.status(200).json(categories)
    } catch (error) {
      return res.status(400).json({
        error: 'CATEGORY_FINDALL',
        message: 'Houve um erro ao listar categorias',
        fields: getMongooseErrors(error)
      })
    }
  },
}