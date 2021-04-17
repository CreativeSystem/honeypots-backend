import { UseCaseError } from '@/errors'
import { prisma } from '@/utils/prisma'
import { Validate } from '@/utils/validate-parameter'

import { UserDTO } from '../types'

export const findUserById = async (id: string): Promise<UserDTO> => {
  Validate.parameterNotNullOrUndefined('id', id)

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) throw new UseCaseError(`User with id ${id} not found`)

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture
  }
}
