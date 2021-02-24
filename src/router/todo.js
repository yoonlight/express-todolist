import { Router } from 'express'
import model from '../model/index.js'

const router = Router()

router.get('/', (req, res) => {
  model.find((err, result) => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  model.findOne({_id: req.params.id},(err, result) => {
    res.send(result)
  })
})

router.post('/', (req, res) => {
  model.create(req.body, function (err) {
    if (err) return handleError(err);
  })
  res.json('create todo list')
})

router.put('/:id', (req, res) => {
  res.json(`update ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.json(`delete ${req.params.id}`)
})

export default router
