const Business = require('../models/business')
const { getMongooseErrors } = require('../helpers/errors')

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email } = req.body
      const data = {
        name,
        email
      }
      const business = new Business(data)
      await business.validate()
      await business.save()
      
      return res.status(200).json(business)
    } catch (error) {
      return res.status(400).json({
        error: 'BUSINESS_CREATE',
        message: 'Houve um erro ao cadastrar uma empresa',
        fields: getMongooseErrors(error)
      })
    }
  },
}