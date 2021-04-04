import { Strategy, ExtractJwt,SecretOrKeyProvider,VerifyCallback } from 'passport-jwt'

import { findUserById } from '@/usecases/find-user-by-id'
import { Key } from '@/utils/key'

interface JwtPayload{
  sub: string
}

const verify: VerifyCallback = ({ sub }: JwtPayload, next) => {
  findUserById(sub)
    .then(user => next(null,user))
    .catch(e => next(e))
}

const secretOrKeyProvider: SecretOrKeyProvider = (_,__,next) => {
  Key.getJwtPublicKey()
    .then(key => next(null,key))
    .catch(e => next(e))
}

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

export const jwtStrategy = new Strategy({
  jwtFromRequest,
  secretOrKeyProvider,
  algorithms: ['RS512'],
  issuer: process.env.JWT_ISSUER
},verify)
