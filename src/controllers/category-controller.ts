import { RequestHandler } from 'express'

import { findAllCategories } from '@/usecases/find-all-categories'

export const categoriesController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { limit, offset } = req.query

  const categories = await findAllCategories({
    limit: parseInt((limit || '5') as string),
    offset: parseInt((offset || '0') as string)
  })

  res.status(200).json(categories)
}
