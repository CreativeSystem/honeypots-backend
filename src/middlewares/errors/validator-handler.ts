import { ErrorRequestHandler } from 'express'

import { ValidationError } from '@/errors'

export const validatorErrorHandler: ErrorRequestHandler = (
  error,_,res,next
): void => {
  if (error instanceof ValidationError) {
    res.status(400).json(error.errors)
  } else {
    next(error)
  }
}
