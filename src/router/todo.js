import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json('todo list')
})

router.get('/:id', (req, res) => {
  res.json(`show ${req.params.id}`)
})

router.post('/', (req, res) => {
  res.json('create todo list')
})

router.put('/:id', (req, res) => {
  res.json(`update ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.json(`delete ${req.params.id}`)
})
export default router