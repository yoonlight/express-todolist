import express from 'express'
import dotenv from 'dotenv'
import router from './router/index.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passportConfig from './library/passport.js'

dotenv.config()
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => console.log('MongoDB connect success!'))
  .catch((error) => console.log(error))

const app = express()

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser(process.env.SERVER_SECRET_KEY))
app.use(
  session({
    secret: process.env.SERVER_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3.6e6 * 24 },
  })
)

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
