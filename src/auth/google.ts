import { Strategy,Profile,VerifyCallback } from 'passport-google-oauth20'

type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => void

const verify: VerifyFunction = (_, __, profile, next) => {
  next(null, profile)
}

export const googleStrategy = new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, verify)
