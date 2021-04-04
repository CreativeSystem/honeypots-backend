import { createValidatorRules } from '@/utils/create-validator-rules'

import { LoginUserDTO } from './dto'

export const loginUserRules = createValidatorRules<LoginUserDTO>({
  email: ['string','required', 'email'],
  password: ['string','required']
})
