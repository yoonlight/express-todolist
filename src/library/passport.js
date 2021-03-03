import passport from 'passport'
import passportJWT from 'passport-jwt';
import { user } from '../model/index.js';

export default () => {
  const JwtStrategy = passportJWT.Strategy;
  const ExtractJwt = passportJWT.ExtractJwt;
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SERVER_SECRET_KEY;
  opts.issuer = 'accounts.examplesoft.com';
  opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
          // or you could create a new account
      }
    });
  }));
  
  passport.use(user.createStrategy());
  passport.serializeUser(user.serializeUser());
  passport.deserializeUser(user.deserializeUser());
}
