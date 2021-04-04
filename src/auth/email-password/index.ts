import { VerifyFunction } from 'passport-local'

import { loginUser } from '@/usecases/login-user'

import { EmailPasswordStrategy } from './strategy'

const verify: VerifyFunction = (email,password, next) => {
  loginUser({
    email,
    password
  })
    .then(user => next(null,user))
    .catch((e) => next(e))
}

export const emailPasswordStrategy = new EmailPasswordStrategy(verify)
