import express from 'express'
import passport from 'passport'
import router from './router'
import { expressCfg, mongooseCfg, passportCfg } from './library'

const port = process.env.PORT
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
