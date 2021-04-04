import { UserDTO } from '@/usecases/types'

export interface GenerateTokenDTO {
  user: UserDTO
}

export interface TokenDTO{
  access_token: string
}
