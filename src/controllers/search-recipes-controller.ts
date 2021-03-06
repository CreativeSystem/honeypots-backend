import { RequestHandler } from 'express'

import { searchRecipeByTerm } from '@/usecases/search-recipe-by-term'

export const searchRecipesController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { limit, offset, q } = req.query

  const recipes = await searchRecipeByTerm({
    limit: parseInt((limit || '5') as string),
    offset: parseInt((offset || '0') as string),
    searchTerm: q as string
  })

  res.status(200).json(recipes)
}
