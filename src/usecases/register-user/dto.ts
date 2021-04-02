export interface RegisterUserDTO{
  name: string
  email: string
  password: string
  password_confirmation: string
  birth_date: string
}

export interface CreatedUserDTO{
  id: string
  name: string
  email: string
  birth_date: Date
  created_at: Date
  updated_at: Date
}
