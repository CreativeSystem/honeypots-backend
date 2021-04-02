export interface RegisterUserDTO{
  name: string
  email: string
  password: string
  birthDate: string
}

export interface CreatedUserDTO{
  id: string
  name: string
  email: string
  birthDate: Date
  createdAt: Date
  updatedAt: Date
}
