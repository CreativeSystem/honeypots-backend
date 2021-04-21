import { RequestHandler } from 'express'

import { findAllCategories } from '@/usecases/find-all-categories'
import { findCategoryRecipes } from '@/usecases/find-category-recipes'

export const feedController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { categories_limit, categories_offset } = req.query

  const limit = parseInt((categories_limit || '5') as string)
  const offset = parseInt((categories_offset || '0') as string)

  const { total, data: categoriesData } = await findAllCategories({
    limit,
    offset
  })

  const suggestions = []

  const categories = []

  for (let i = 0; i < categoriesData.length; i++) {
    const { id, name } = categoriesData[i]
    const { data: recipes } = await findCategoryRecipes({
      limit: 5,
      offset: 0,
      id: id
    })

    if (recipes.length) {
      suggestions.push(recipes[0])
    }

    categories.push({
      id,
      name,
      recipes
    })
  }

  const response = {
    suggestions,
    categories: {
      total,
      data: categories
    }

  }

  res.status(200).json(response)
}
