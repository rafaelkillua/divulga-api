const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const db = require('./database/mongoose')
const port = process.env.PORT || 80

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())
app.use(cookieParser())

router(app)

app.listen(port, () => {
  console.log(`Online on port ${port}`)
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => console.log('DB connected'))
})

module.exports = app
