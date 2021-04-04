import { ParameterError } from '@/errors'

export namespace Validate {
  export const parameterNotNullOrUndefined = <T>(parameter: string,value?: T): void => {
    validateParameter(() => value !== null && value !== undefined, `${parameter} is required`)
  }

  export const validateParameter = (validate: () => boolean, message: string): void => {
    const isValid = validate()

    if (!isValid) {
      throw new ParameterError(message)
    }
  }
}
