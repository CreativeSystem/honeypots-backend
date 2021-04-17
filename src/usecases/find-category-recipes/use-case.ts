import { RecipeDTO, ResponsePage } from '@/usecases/types'
import { prisma } from '@/utils/prisma'

import { CategoryPage } from './dto'

export const findCategoryRecipes = async ({ id, limit, offset }: CategoryPage): Promise<ResponsePage<RecipeDTO>> => {
  const total = await prisma.recipe.count({
    where: {
      categories: {
        some: {
          id
        }
      }
    }
  })

  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      preparationTime: true
    },
    where: {
      categories: {
        some: {
          id
        }
      }
    },
    skip: offset,
    take: limit
  })

  return {
    total,
    data: recipes.map<RecipeDTO>(({ id, name,preparationTime: preparation_time }) => ({
      id,
      name,
      preparation_time,
      likes_count: 0,
      visualization_count: 0,
      liked: false,
      visualized: false,
      photos_url: [],
      recipe_detail_url: '',
      toggle_like_url: ''
    }))
  }
}
