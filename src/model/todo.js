import mongoose from 'mongoose'
const { Schema } = mongoose

const todoSchema = new Schema({
  title: String,
  username: String,
  body: String,
  date: { type: Date, default: Date.now },
  complete: { type: Boolean, default: false },
  rate: Number,
  tag: Array,
})

const todo = mongoose.model('Todo', todoSchema)

export default todo
