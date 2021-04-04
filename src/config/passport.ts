import passport from 'passport'

import { facebookStrategy, googleStrategy, emailPasswordStrategy, jwtStrategy } from '@/auth'

passport.use(emailPasswordStrategy)
passport.use(facebookStrategy)
passport.use(googleStrategy)
passport.use(jwtStrategy)

passport.serializeUser((user, next) => next(null, user))
passport.deserializeUser((obj, next) => next(null, obj))

export default passport
