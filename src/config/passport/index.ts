import passport from 'passport'

import facebook from '@/config/passport/facebook'
import google from '@/config/passport/google'

passport.use(facebook)
passport.use(google)

passport.serializeUser((user, next) => next(null, user))
passport.deserializeUser((obj, next) => next(null, obj))

export default passport
