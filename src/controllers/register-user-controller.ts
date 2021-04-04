import { RequestHandler } from 'express'

import { registerUser, RegisterUserDTO } from '@/usecases/register-user'

export const registerUserController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { email,name,birth_date,password,password_confirmation } = req.body as RegisterUserDTO

  const user = await registerUser({ email,name,birth_date,password,password_confirmation })

  res.status(201).json(user)
}
