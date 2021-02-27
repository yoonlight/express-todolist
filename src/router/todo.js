import { Router } from 'express'
import { todo } from '../model/index.js'
import schedule from 'node-schedule'

const router = Router()

router.get('/', async (req, res) => {
  const { offset, limit, complete } = req.query;
  if (complete == undefined) {
    const count = await todo.countDocuments();
    const page = Math.ceil(count/(parseInt(limit)));
    await todo.find((err, result) => {
      if (err) res.status(400).send(err) ;
      if (result == []) res.status(404) ;
      res.json({pagination: {count, page}, query : result})
    }).skip((parseInt(offset)-1)*parseInt(limit)).limit(parseInt(limit))
  } else {
    const count = await todo.countDocuments().where('complete').equals(complete);
    const page = Math.ceil(count/(parseInt(limit)));
    await todo.find((err, result) => {
      if (err) res.status(400).send(err) ;
      if (result == []) res.status(404) ;
      res.json({pagination: {count, page}, query : result})
    }).skip((parseInt(offset)-1)*parseInt(limit)).limit(parseInt(limit)).where('complete').equals(complete);
  }
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
  })
})

router.delete('/:id', async (req, res) => {
  await todo.findOneAndRemove({ _id: req.params.id }, (err, result) => {
    res.send(result)
  })
})

export default router
