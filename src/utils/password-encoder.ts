import { hash } from 'bcrypt'
import { promisify } from 'util'

export const encode = async (password: string): Promise<string> =>
  await promisify(hash)(password,10)
