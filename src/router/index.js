import { Router } from 'express'
import todo from './todo.js'

const router = Router()

router.get('/', (req, res) => {
  res.json('welcome to api server')
})
router.use('/todo', todo)

export default router