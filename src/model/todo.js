import mongoose from 'mongoose'
const { Schema } = mongoose

const todoSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  date: { type: Date, default: Date.now },
  complete: { type: Boolean, default: false }
})

const todo = mongoose.model('Todo', todoSchema);

export default todo
