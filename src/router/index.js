import { Router } from 'express'
import todo from './todo.js'
import auth from './login.js'
const router = Router()

router.get('/', (req, res) => {
  res.json('welcome to api server')
})
router.use('/todo', todo)
router.use('/auth', auth)

export default router
