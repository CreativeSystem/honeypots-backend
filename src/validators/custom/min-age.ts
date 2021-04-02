import { differenceInYears } from 'date-fns'
import { RegisterCallback } from 'validatorjs'

import { getParametersAsStringArray } from '../utils'

export const minAge: RegisterCallback = (value,args): boolean => {
  if (typeof value === 'boolean') return false

  const age = Math.abs(differenceInYears(new Date(),new Date(value)))

  const [minAge] = getParametersAsStringArray(args)

  return parseInt(minAge) < age
}
