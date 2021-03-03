import express from 'express'
import dotenv from 'dotenv'
import router from './router'
import passport from 'passport'
import { expressCfg, mongooseCfg, passportCfg } from './library'

dotenv.config()
mongooseCfg()

const app = express()
expressCfg(app)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

app.get('/', (req, res) => {
  res.json('Welcome to Todo List server')
})

app.listen(process.env.Port, () => {
  console.log('Server listening', process.env.Port)
})

passportCfg(passport)
