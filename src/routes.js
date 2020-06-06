const businessController = require('./controllers/business')

module.exports = app => {
  app.post(`/business`, businessController.create)
}
