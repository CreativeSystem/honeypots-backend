import { Request, Response } from 'express'

import { registerUser, RegisterUserDTO } from '@/usecases/register-user'

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email,name,birth_date,password,password_confirmation } = req.body as RegisterUserDTO

  const user = await registerUser({ email,name,birth_date,password,password_confirmation })

  return res.status(201).json(user)
}
