import { Router } from 'express'
import { todo } from '../model/index.js'
import { pagination, search } from '../library/query'
// import passport from 'passport'
import { eventEmitter } from '../service/event'

const router = Router()

// const auth = passport.authenticate('jwt', { session: false })

const list = async (req, res) => {
  const theme = req.query.theme
  const { perPage, pageNum } = pagination(req.query)
  let result = todo.find().sort({ date: -1 }).skip(pageNum).limit(perPage)
  let count = todo.countDocuments()
  if (theme) {
    result.where('title').equals(theme)
    count.where('title').equals(theme)
  }
  const searchQuery = search(req.query, result, count)

  try {
    const pageCount = await searchQuery.count.exec()
    const page = Math.ceil(pageCount / perPage)
    await searchQuery.result.exec((err, result) => {
      if (err) res.status(400).send(err)
      if (result == []) res.status(404)
      res.json({ pagination: { pageCount, page }, query: result })
    })
  } catch (error) {
    res.json(error)
  }
}

const theme = async (req, res) => {
  let result = todo.find().sort({ date: -1 }).distinct('title')

  try {
    await result.exec((err, result) => {
      if (err) res.status(400).send(err)
      if (result == []) res.status(404)
      res.json(result)
    })
  } catch (error) {
    res.json(error)
  }
}

router.get('/', list)

router.get('/theme', theme)

router.get('/:id', async (req, res) => {
  await todo.findOne({ _id: req.params.id }).exec((err, result) => {
    if (err) return res.status(404).send(err)
    res.send(result)
  })
})

router.post('/', async (req, res) => {
  await todo.create(req.body, (err) => {
    if (err) return console.log(err)
    const msg = 'create todo list'
    eventEmitter.emit('updateTodo', msg)
    res.status(201).json(msg)
  })
})

router.put('/:id', async (req, res) => {
  await todo.findOneAndUpdate({ _id: req.params.id }, req.body).exec(() => {
    const msg = { message: 'success to update data' }
    eventEmitter.emit('updateTodo', msg)
    res.status(200).json(msg)
  })
})

router.delete('/:id', async (req, res) => {
  await todo.findOneAndRemove({ _id: req.params.id }).exec(() => {
    const msg = { message: 'success to delete data' }
    eventEmitter.emit('updateTodo', msg)
    res.status(200).json(msg)
  })
})

export default router
