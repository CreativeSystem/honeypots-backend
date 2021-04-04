import { RequestHandler } from 'express'

import { generateToken } from '@/usecases/generate-token'
import { UserDTO } from '@/usecases/types'

export const loginUserController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const token = await generateToken({
    user: req.user as UserDTO
  })

  res.status(200).json(token)
}
