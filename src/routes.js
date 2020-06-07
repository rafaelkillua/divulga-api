const multer = require('multer')
const upload = multer()
const businessController = require('./controllers/business')
const categoryController = require('./controllers/category')

module.exports = app => {
  // GERAL
  app.get(`/`, (_, res) => res.status(200).send('Online'))

  // BUSINESS
  app.post(`/business`, businessController.create),

  app.post(`/business-logo`, upload.single('logo'), businessController.uploadLogo),
  
  app.get(`/business`, businessController.find),

  app.delete(`/business/:id`, businessController.delete),

  // CATEGORY
  app.post(`/category`, categoryController.create)

  app.get(`/category`, categoryController.findAll)
}
