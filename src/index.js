import express from 'express';
import dotenv from 'dotenv';
import router from './router/index.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { user } from './model/index.js';

dotenv.config()
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(process.env.MONGODB_URL, options)
  .then(() => console.log('MongoDB connect success!'))
  .catch(error => handleError(error));

const app = express()

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use('/api', router);
app.use(passport.initialize());
app.use(flash())
app.use(passport.session());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.json('Welcome to Todo List server')
})

app.listen(process.env.Port, () => {
  console.log('Server listening', process.env.Port)
})

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());