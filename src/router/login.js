import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'
import { transporter } from '../service/mailService.js'
const router = Router()

router.get('/', async (req, res) => {
  await user.find((err, result) => {
    res.send(result)
  }).skip((parseInt(req.query.offset)-1)*parseInt(req.query.limit)).limit(parseInt(req.query.limit))
})

router.post('/email', async (req, res, next) => {
  const email = req.body.email
  const mailOptions = {
    from: process.env.EMAIL_ADDR,
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  const mail = transporter()
  await mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json(error)
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message:'sucess' })
    }
  });
});

router.post('/register', (req, res, next) => {
  console.log('registering user');
  user.register(new user({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.status(200);
  });
});

router.post('/', async(req, res) => {
  await user.create(req.body, (err) => {
    if (err) return handleError(err)
  })
  res.status(201).json('Create user!')
});

router.get('/login', (req, res) => {
  res.json({ user: req.user, message: req.flash('error')[0] });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: 'login', failureFlash: true }),
  (req, res) => {
    res.json({ message: 'success' });
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
export default router