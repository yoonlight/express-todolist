import express from 'express'
import dotenv from 'dotenv'
import router from './router/index.js'
import mongoose from 'mongoose'
import passport from 'passport'
import passportConfig from './library/passport.js'
import expressConfig from './library/express'

dotenv.config()
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => console.log('MongoDB connect success!'))
  .catch((error) => console.log(error))

const app = express()
expressConfig(app)

app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router)

app.get('/', (req, res) => {
  res.json('Welcome to Todo List server')
})

app.listen(process.env.Port, () => {
  console.log('Server listening', process.env.Port)
})

passportConfig()
