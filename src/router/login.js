import { Router } from 'express'
import passport from 'passport'
import { user } from '../model/index.js'

const router = Router()

router.get('/', async (req, res) => {
  await user.find((err, result) => {
    res.send(result)
  }).skip((parseInt(req.query.offset)-1)*parseInt(req.query.limit)).limit(parseInt(req.query.limit))
})

router.post('/', async(req, res) => {
  await user.create(req.body, (err) => {
    if (err) return handleError(err)
  })
  res.status(201).json('Create user!')
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/'} ),
  (req, res) => {
    console.log('dd?')
    res.redirect('/');
  }
);

router.get('/logout',
  (req, res) => {
    req.logout();
    res.redirect('/');
  });
export default router