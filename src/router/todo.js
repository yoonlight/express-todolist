import { Router } from 'express'
import { todo } from '../model/index.js'

const router = Router()

router.get('/', async (req, res) => {
  await todo.find((err, result) => {
    res.send(result)
  })
})

router.get('/:id', async (req, res) => {
  await todo.findOne({ _id: req.params.id }, (err, result) => {
    res.send(result)
  })
})

router.post('/', async (req, res) => {
  await todo.create(req.body, (err) => {
    if (err) return handleError(err)
  })
  res.status(201).json('create todo list')
})

router.put('/:id', async (req, res) => {
  await todo.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {
    res.send(result)
  // res.json(`update ${req.params.id}`)
  })
})

router.delete('/:id', async (req, res) => {
  await todo.findOneAndRemove({ _id: req.params.id }, (err, result) => {
    // res.send(`delete ${req.params.id}`)
    res.send(result)
  })
})

export default router
