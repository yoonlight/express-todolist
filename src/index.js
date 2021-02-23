import express from 'express'
import dotenv from 'dotenv'
import router from './router/index.js'

dotenv.config()
const app = express()

app.use('/api', router)

app.get('/', (req, res) => {
  res.json('welcome to Todo List server')
})

app.listen(process.env.Port, () => {
  console.log('Server listening', process.env.Port)
})

