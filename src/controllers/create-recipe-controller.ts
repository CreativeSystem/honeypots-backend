import { RequestHandler } from 'express'

import { CreateRecipeDTO,createRecipe } from '@/usecases/create-recipe'
import { UserDTO } from '@/usecases/types'

export const createRecipeController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { name,description,categories,ingredients,preparation,preparation_time } = req.body as CreateRecipeDTO
  const owner = req.user as UserDTO

  const recipe = await createRecipe({ name,description,categories,ingredients,owner,preparation,preparation_time })

  res.status(201).json(recipe)
}
