import { RegisterCallback } from 'validatorjs'

export const confirmed: RegisterCallback = (value,args,key): boolean => {
  const confirmedKey = key + '_confirmation'

  if (this?.validator.input[confirmedKey] === val) {
    return true
  }

  return false
}
