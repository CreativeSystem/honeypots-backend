import { encode } from '@/utils/password-encoder'
import { prisma } from '@/utils/prisma'

import { RegisterUserDTO,CreatedUserDTO } from './dto'

export const registerUser = async (userDto: RegisterUserDTO): Promise<CreatedUserDTO> => {
  const { email,name,password,birthDate } = userDto
  const passwordHash = await encode(password)

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
    birthDate: user.birthDate,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}
