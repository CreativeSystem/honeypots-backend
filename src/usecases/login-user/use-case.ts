import { LoginError } from '@/errors'
import { Password } from '@/utils/password'
import { prisma } from '@/utils/prisma'
import { validator } from '@/validators/validator-decorator'

import { LoginUserDTO, UserDTO } from './dto'
import { loginUserRules } from './rules'

const loginUser = async ({ email,password }: LoginUserDTO): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) throw new LoginError()

  const isPasswordVerified = await Password.verify(password, user.passwordHash)
  if (!isPasswordVerified) throw new LoginError()

  return {
    id: user.id,
    email: user.email
  }
}

export default validator(loginUser,loginUserRules)
