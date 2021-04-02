import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (
  error: Error,_,res,__
): void => {
  res.status(500).json({
    name: error.name,
    message: error.message
  })
}
