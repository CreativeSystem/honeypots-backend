import Validator from 'validatorjs'

import { ValidationError } from '@/errors'

type DecoratedFunction<T,U> = (param: T) => Promise<U>

export const validator = <T,U>(next: DecoratedFunction<T,U>, rules: Validator.Rules): DecoratedFunction<T,U> => {
  return async (param: T): Promise<U> => {
    const validate = new Validator(param, rules)

    const check = await (new Promise<boolean>((resolve) => {
      validate.checkAsync(() => resolve(true), () => resolve(false))
    }))

    if (!check) {
      throw new ValidationError(validate.errors.all())
    }

    return await next(param)
  }
}
