import mongoose from 'mongoose';
import todo from './todo.js'
export { todo }
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

const blog = mongoose.model('Blog', blogSchema);

export default blog
