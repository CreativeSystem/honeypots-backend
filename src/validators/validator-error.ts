import { ValidationErrors } from 'validatorjs'

export class ValidationError extends Error {
  constructor (public errors: ValidationErrors) {
    super()
  }
}
