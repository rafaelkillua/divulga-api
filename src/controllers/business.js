const Address = require('../models/address')
const Business = require('../models/business')
const { getMongooseErrors } = require('../helpers/errors')

module.exports = {
  create: async (req, res) => {
    try {
      const { name, description, email, phone, address = {}, category } = req.body
      const { street, number, neighborhood, observations, city_id, city, uf_id, uf, latitude, longitude } = address

      const addressData = {
        street,
        number,
        neighborhood,
        observations,
        city_id,
        city,
        uf_id,
        uf,
        latitude,
        longitude
      }
      const newAddress = new Address(addressData)
      await newAddress.validate()

      const businessData = {
        name,
        description,
        email,
        phone,
        address: newAddress,
        category
      }
      const business = new Business(businessData)
      await business.validate()

      await business.save()
      await newAddress.save()
      return res.status(200).json(business)
    } catch (error) {
      return res.status(400).json({
        error: 'BUSINESS_CREATE',
        message: 'Houve um erro ao cadastrar uma empresa',
        originalMessage: error.message,
        fields: getMongooseErrors(error)
      })
    }
  },

  find: async (req, res) => {
    try {
      const { name, category, uf_id, city_id, page = 1, perPage = 12 } = req.query
      const where = {}

      if (category) where.category = category
      // if (uf_id) where.uf_id = uf_id
      // if (city_id) where.city_id = city_id
      if (name) {
        where.$text = {
          $search: name
        }
      }

      const list = await Business.find(
        where,
        {
          score: {
            $meta: "textScore"
          }
        },
        {
          sort: {
            score: {
              $meta: "textScore"
            },
            name: 1
          },
          populate: ['address', 'category'],
          page: +page,
          limit: +perPage,
          skip: ((+page || 1) - 1) * +perPage
        }
      )

      const total = await Business.estimatedDocumentCount()

      return res.status(200).json({
        pagination: {
          total,
          perPage: +perPage,
          page: (+page || 1)
        },
        list
      })
    } catch (error) {
      return res.status(400).json({
        error: 'BUSINESS_FINDALL',
        message: 'Houve um erro ao listar empresas',
        originalMessage: error.message,
        fields: getMongooseErrors(error)
      })
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      const business = await Business.findOne({ _id: id }).populate('address')

      if (business) {
        business.address.remove()
        business.remove()
      } else throw new Error('BUSINESS_NOT_FOUND')

      return res.status(200).json({ message: 'Empresa excluída com sucesso' })
    } catch (error) {
      if (error.message === 'BUSINESS_NOT_FOUND') {
        return res.status(404).json({
          error: 'Empresa não encontrada',
          message: 'Houve um erro ao excluir essa empresa',
          originalMessage: error.message,
          fields: getMongooseErrors(error)
        })
      }
      return res.status(400).json({
        error: 'CATEGORY_FINDALL',
        message: 'Houve um erro ao listar categorias',
        originalMessage: error.message,
        fields: getMongooseErrors(error)
      })
    }
  },
}