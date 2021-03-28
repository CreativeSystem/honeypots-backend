import { Strategy,VerifyFunction } from 'passport-facebook'

const verify: VerifyFunction = (accessToken, refreshToken, profile, next) => {
  next(null, profile)
}

export default new Strategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id','picture.type(large)','name','email']
}, verify)
