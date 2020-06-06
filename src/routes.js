const businessController = require('./controllers/business')
const categoryController = require('./controllers/category')

module.exports = app => {
  app.get(`/`, (_, res) => res.status(200).send('Online'))

  app.post(`/business`, businessController.create),

  app.get(`/business`, businessController.findAll),

  app.post(`/category`, categoryController.create)

  app.get(`/category`, categoryController.findAll)
}
