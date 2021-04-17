import { RequestHandler } from 'express'

import { findAllCategories } from '@/usecases/find-all-categories'

export const categoriesController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { limit, offset } = req.query

  const categories = await findAllCategories({
    limit: parseInt(limit as string),
    offset: parseInt(offset as string)
  })

  res.status(200).json(categories)
}
