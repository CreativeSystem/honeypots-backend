import { readFile } from 'fs'
import { promisify } from 'util'

export namespace Key{
  export async function getJwtPublicKey (): Promise<Buffer> {
    return await getKey(process.env.JWT_PUBLIC_KEY)
  }

  export async function getJwtPrivateKey (): Promise<Buffer> {
    return await getKey(process.env.JWT_PRIVATE_KEY)
  }

  export async function getKey (path: string): Promise<Buffer> {
    const file = await promisify(readFile)(path)
    return file
  }

}
