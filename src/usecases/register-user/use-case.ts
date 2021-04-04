import { Password } from '@/utils/password'
import { prisma } from '@/utils/prisma'
import { validator } from '@/validators/validator-decorator'

import { RegisterUserDTO,CreatedUserDTO } from './dto'
import { registerUserRules } from './rules'

const registerUser = async (userDto: RegisterUserDTO): Promise<CreatedUserDTO> => {
  const { email,name,password,birth_date: birthDate } = userDto
  const passwordHash = await Password.encode(password)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      birthDate,
      passwordHash
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birth_date: user.birthDate,
    created_at: user.createdAt,
    updated_at: user.updatedAt
  }
}

export default validator(registerUser,registerUserRules)
