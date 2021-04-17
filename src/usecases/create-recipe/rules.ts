import { createValidatorRules } from '@/utils/create-validator-rules'

import { CreateRecipeDTO } from './dto'

export const createRecipeRules = createValidatorRules<CreateRecipeDTO>({
  name: ['string','required', {
    min: [3]
  }],
  description: ['string', 'required'],
  preparation_time: ['integer', 'required', {
    min: [0]
  }],
  categories: ['array'],
  preparation: ['array', 'required'],
  ingredients: ['array', 'required'],
  owner: {
    id: ['string', 'required']
  }
})
