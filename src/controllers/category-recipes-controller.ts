import { RequestHandler } from 'express'

import { findCategoryRecipes } from '@/usecases/find-category-recipes'

export const categoryRecipesController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { limit, offset } = req.query

  const recipes = await findCategoryRecipes({
    limit: parseInt((limit || '5') as string),
    offset: parseInt((offset || '0') as string),
    id: req.params.id
  })

  res.status(200).json(recipes)
}
