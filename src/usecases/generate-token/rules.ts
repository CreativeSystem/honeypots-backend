import { createValidatorRules } from '@/utils/create-validator-rules'

import { GenerateTokenDTO } from './dto'

export const generateTokeRules = createValidatorRules<GenerateTokenDTO>({
  user: {
    id: ['required']
  }
})
