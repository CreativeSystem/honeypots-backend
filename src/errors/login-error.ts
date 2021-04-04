import { UseCaseError } from './usecase-error'

export class LoginError extends UseCaseError {
  constructor () {
    super()
    this.message = 'E-mail or password is incorrect'
    this.name = 'LoginError'
  }
}
