import { UseCaseError } from './usecase-error'

export class ParameterError extends UseCaseError {
  constructor (message: string) {
    super(message)
    this.name = 'ParameterError'
  }
}
