import { Request, Response } from 'express'

import { registerUser, RegisterUserDTO } from '@/usecases/register-user'

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email,name,birthDate,password } = req.body as RegisterUserDTO

  const user = await registerUser({ email,name,birthDate,password })

  return res.status(201).json(user)
}
