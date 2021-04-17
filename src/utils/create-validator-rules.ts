import { Rules, TypeCheckingRule } from 'validatorjs'

type ValidatorRules<T> = {
  [P in keyof T]?:
  | string
  | Array<string | TypeCheckingRule>
  | ValidatorRules<T[P]>
  | ValidatorRules<P>
}

export function createValidatorRules <T = any> (rules: ValidatorRules<T>): Rules {
  return rules as Rules
}
