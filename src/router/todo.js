import { Router } from 'express'
import mongoose from 'mongoose'
import model from '../model/index.js'

const router = Router()
const Blog = mongoose.model('Blog', model);

router.get('/', (req, res) => {
  mongoose.model('Blog').find((err, result) => {
    res.send(result)
  });
})

router.get('/:id', (req, res) => {
  res.json(`show ${req.params.id}`)
})

router.post('/', (req, res) => {
  Blog.create(req.body, function (err) {
    if (err) return handleError(err);
  });  
  res.json('create todo list')
})

router.put('/:id', (req, res) => {
  res.json(`update ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.json(`delete ${req.params.id}`)
})
export default router