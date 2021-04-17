import { RequestHandler } from 'express'

import { findRecipeById } from '@/usecases/find-recipe-by-id'

export const recipeDetailController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const id = req.params.id

  const recipe = await findRecipeById(id)

  res.status(200).json(recipe)
}
