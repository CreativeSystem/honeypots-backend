import { ErrorRequestHandler } from 'express'

import { UseCaseError } from '@/errors'

export const useCaseErrorHandler: ErrorRequestHandler = (
  error: Error,_,res,next
): void => {
  if (error instanceof UseCaseError) {
    res.status(417).json({
      name: error.name,
      message: error.message
    })
  } else {
    next(error)
  }
}
