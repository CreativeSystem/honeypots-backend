import { ValidationErrors } from 'validatorjs'

import { UseCaseError } from './usecase-error'

export class ValidationError extends UseCaseError {
  constructor (public errors: ValidationErrors) {
    super()
    this.name = 'ValidationError'
  }
}
