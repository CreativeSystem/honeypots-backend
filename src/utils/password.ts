import { hash,compare } from 'bcrypt'
import { promisify } from 'util'

export namespace Password {
  export const encode = async (password: string): Promise<string> =>
    await promisify(hash)(password,10)

  export const verify = async (password: string,hash: string): Promise<boolean> =>
    await promisify(compare)(password,hash)
}
