import { createValidatorRules } from '@/utils/create-validator-rules'

import { RegisterUserDTO } from './dto'

export const registerUserRules = createValidatorRules<RegisterUserDTO>({
  email: ['string','required', 'email', {
    unique: ['users','email']
  }],
  name: ['string','required', {
    min: [3]
  }],
  birth_date: ['date','required',{
    min_age: [18]
  }],
  password: ['string','required','confirmed',{
    between: [8,20]
  }]
})
