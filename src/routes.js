const businessController = require('./controllers/business')

module.exports = app => {
  app.get(`/`, (_, res) => res.status(200).send('Online'))

  app.post(`/business`, businessController.create)
}
