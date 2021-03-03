import { Router } from 'express'
import { todo } from '../model/index.js'

const router = Router()

const list = async (req, res) => {
  const { offset, limit, complete, search, field } = req.query
  const perPage = parseInt(limit)
  const pageNum = (parseInt(offset) - 1) * perPage
  let result = todo.find().sort({ date: -1 }).skip(pageNum).limit(perPage)
  let count = todo.countDocuments()

  if (complete != undefined) {
    count.where('complete').equals(complete)
    result.where('complete').equals(complete)
    if (search != undefined && field != undefined) {
      count.where(field).regex(search)
      result.where(field).regex(search)
    }
  }

  if (search != undefined && complete == undefined && field != undefined) {
    count.where(field).regex(search)
    result.where(field).regex(search)
  }

  try {
    const pageCount = await count.exec()
    const page = Math.ceil(pageCount / perPage)
    await result.exec((err, result) => {
      if (err) res.status(400).send(err)
      if (result == []) res.status(404)
      res.json({ pagination: { pageCount, page }, query: result })
    })
  } catch (error) {
    res.json(error)
  }
}

router.get('/', list)

router.get('/:id', async (req, res) => {
  await todo.findOne({ _id: req.params.id }).exec((err, result) => {
    if (err) return res.status(404).send(err)
    res.send(result)
  })
})

router.post('/', async (req, res) => {
  await todo.create(req.body, (err) => {
    if (err) return console.log(err)
  })
  res.status(201).json('create todo list')
})

router.put('/:id', async (req, res) => {
  await todo.findOneAndUpdate({ _id: req.params.id }, req.body).exec(() => {
    res.status(200).json({ message: 'success to update data' })
  })
})

router.delete('/:id', async (req, res) => {
  await todo.findOneAndRemove({ _id: req.params.id }).exec(() => {
    res.status(200).json({ message: 'success to delete data' })
  })
})

export default router
