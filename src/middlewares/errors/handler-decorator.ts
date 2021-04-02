import { RequestHandler } from 'express'

export const errorHandlerDecorator = (requestHandler: RequestHandler): RequestHandler => {
  const handler: RequestHandler = (req,res,next): void => {
    Promise.all([
      requestHandler(req,res,next)
    ]).catch((err) => next(err))
  }

  return handler
}
