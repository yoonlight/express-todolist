import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'
// import { transporter } from '../service/mailService.js'
import jwt from 'jsonwebtoken'
import { pagination } from '../library/query'
import { eventEmitter } from '../service/event'

const router = Router()

router.get('/user', async (req, res) => {
  const { perPage, pageNum } = pagination(req.query)
  const result = await user.find().skip(pageNum).limit(perPage)
  res.send(result)
})

router.post('/email', async (req, res) => {
  const email = req.body.email
  const mailOptions = { from: process.env.EMAIL_ADDR, to: email }
  mailOptions.subject = 'Sending Email using Node.js'
  mailOptions.text = 'That was easy!'
  eventEmitter.emit('sendTodo', mailOptions)
  res.json({ message: 'sucess' })
  // const mail = transporter()
  // await mail.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error)
  //     res.status(400).json(error)
  //   } else {
  //     console.log('Email sent: ' + info.response)
  //     res.json({ message: 'sucess' })
  //   }
  // })
})

router.post('/register', (req, res, next) => {
  user.register(
    new user({ username: req.body.username, email: req.body.email }),
    req.body.password,
    (err) => {
      if (err) return next(err)
      res.status(200).json({ message: 'register user' })
    }
  )
})

router.get('/fail', (req, res) => {
  res.status(401).json({ message: 'login fail' })
})

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: 'fail' }),
  async (req, res, next) => {
    req.login(user, { session: false }, (error) => {
      if (error) next(error)
      const option = { expiresIn: '5m' }
      const secretOrKey = process.env.SERVER_SECRET_KEY
      const token = jwt.sign({ uid: req.user._id }, secretOrKey, option)
      return res.json({ message: 'success', token })
    })
  }
)

router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'logout' })
})

export default router
