import { sign } from 'jsonwebtoken'

import { Key } from '@/utils/key'
import { validator } from '@/validators/validator-decorator'

import { GenerateTokenDTO, TokenDTO } from './dto'
import { generateTokeRules } from './rules'

const generateToken = async ({ user }: GenerateTokenDTO): Promise<TokenDTO> => {
  const { id, ...payload } = user
  const privateKey = await Key.getJwtPrivateKey()

  const jwt = await new Promise<string>((resolve,reject) => {
    sign(payload,privateKey,{
      subject: id,
      algorithm: 'RS512',
      issuer: process.env.JWT_ISSUER,
      expiresIn: process.env.JWT_EXPIRATION
    }, (err, jwt) => {
      if (err) reject(err)
      resolve(jwt)
    })
  })

  return {
    access_token: jwt
  }
}

export default validator(generateToken,generateTokeRules)
