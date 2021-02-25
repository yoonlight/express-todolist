import { Router } from 'express'
import { todo } from '../model/index.js'
import schedule from 'node-schedule'

const router = Router()

router.get('/', async (req, res) => {
  await todo.find((err, result) => {
    res.send(result)
  }).skip((parseInt(req.query.offset)-1)*parseInt(req.query.limit)).limit(parseInt(req.query.limit))
})

router.get('/:id', async (req, res) => {
  if (req.query) return schedule.scheduleJob("* * * * * 30",() => {
    console.log('hello world!')
  })
  await todo.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(404).send(err)
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
