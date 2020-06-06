const businessController = require('./controllers/business')
const categoryController = require('./controllers/category')

module.exports = app => {
  // GERAL
  app.get(`/`, (_, res) => res.status(200).send('Online'))

  // BUSINESS
  app.post(`/business`, businessController.create),
  
  app.get(`/business`, businessController.findAll),

  app.delete(`/business/:id`, businessController.delete),

  // CATEGORY
  app.post(`/category`, categoryController.create)

  app.get(`/category`, categoryController.findAll)
}
