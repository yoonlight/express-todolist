import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'
import { transporter } from '../service/mailService.js'
const router = Router()

router.get('/', async (req, res) => {
  // await user.find().skip((parseInt(req.query.offset)-1)*parseInt(req.query.limit)).limit(parseInt(req.query.limit)).exec(
  //   (err, result) => {
  //     res.send(result)
  //   }
  // )
  if(req.isAuthenticated()){
    res.json('success')
  } else {
    res.status(404).json('failure')
  }
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
      res.status(400).json(error)
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

router.get('/login', (req, res) => {
  res.status(401).json({ user: req.user, message: req.flash('error')[0] });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: 'login', failureFlash: true }),
  async (req, res) => {
    res.json({ message: 'success' });
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'logout' });
});
export default router