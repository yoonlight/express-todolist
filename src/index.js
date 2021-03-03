import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import router from './router'
import { expressCfg, mongooseCfg, passportCfg } from './library'

dotenv.config()

const port = process.env.Port
const app = express()

mongooseCfg()
expressCfg(app)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

app.get('/', (req, res) => {
  res.json('Welcome to Todo List server')
})

app.listen(port, () => {
  console.log('Server listening', port)
})

passportCfg(passport)
