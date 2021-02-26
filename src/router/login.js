import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'

const router = Router()

router.get('/', async (req, res) => {
  await user.find((err, result) => {
    res.send(result)
    console.log(req.user)
  }).skip((parseInt(req.query.offset)-1)*parseInt(req.query.limit)).limit(parseInt(req.query.limit))
})

router.post('/register', (req, res, next) => {
  console.log('registering user');
  user.register(new user({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.post('/', async(req, res) => {
  await user.create(req.body, (err) => {
    if (err) return handleError(err)
  })
  res.status(201).json('Create user!')
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user, message: req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  });
export default router