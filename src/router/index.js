import { Router } from 'express'
import todo from './todo'
import auth from './login'
import { eventEmitter } from '../service/event'
const router = Router()

router.get('/', (req, res) => {
  eventEmitter.emit('send')
  res.json('welcome to api server')
})
router.use('/todo', todo)
router.use('/auth', auth)

export default router
