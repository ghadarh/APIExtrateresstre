const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const Extraterrestre = require('./models/extraterrestre');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    const extraterrestre = await Extraterrestre.findById(payload.sub);

    if (!extraterrestre) {
      return done(null, false);
    }

    done(null, extraterrestre);
  } catch(error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const extraterrestre = await Extraterrestre.findOne({ email });

    // If not, handle it
    if (!extraterrestre) {
      return done(null, false);
    }

    // Check if the password is correct
    const isMatch = await extraterrestre.isValidPassword(password);

    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, extraterrestre);
  } catch(error) {
    done(error, false);
  }
}));
