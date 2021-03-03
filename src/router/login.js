import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'
import { transporter } from '../service/mailService.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/user', async (req, res) => {
  const perPage = parseInt(req.query.limit)
  const pageNum = (parseInt(req.query.offset) - 1) * perPage
  const result = await user.find().skip(pageNum).limit(perPage)
  res.send(result)
})

router.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    res.json('success')
  } else {
    res.status(404).json('failure')
  }
})

router.post('/email', async (req, res) => {
  const email = req.body.email
  const mailOptions = { from: process.env.EMAIL_ADDR, to: email }
  mailOptions.subject = 'Sending Email using Node.js'
  mailOptions.text = 'That was easy!'
  const mail = transporter()
  await mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(400).json(error)
    } else {
      console.log('Email sent: ' + info.response)
      res.json({ message: 'sucess' })
    }
  })
})

router.post('/register', (req, res, next) => {
  user.register(
    new user({ username: req.body.username }),
    req.body.password,
    (err) => {
      if (err) return next(err)
      res.status(200).json({ message: 'register user' })
    }
  )
})

router.get('/login', (req, res) => {
  res.status(401).json({ user: req.user, message: req.flash('error')[0] })
})

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: 'login',
    failureFlash: true,
  }),
  async (req, res, next) => {
    // if (err || !user) return res.status(400).end();
    req.login(user, { session: false }, (error) => {
      if (error) next(error)
      const token = jwt.sign(
        {
          uid: user._id,
        },
        process.env.SERVER_SECRET_KEY,
        { expiresIn: '5m' }
      )
      console.log(user._id)

      return res.json({ message: 'success', token })
    })
  }
)
router.get(
  '/a',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send()
  }
)
router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user.profile)
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'logout' })
})

export default router
