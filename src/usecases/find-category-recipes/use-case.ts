import { RecipeDTO, ResponsePage } from '@/usecases/types'
import { prisma } from '@/utils/prisma'

import { CategoryPage } from './dto'

export const findCategoryRecipes = async ({ id, limit, offset }: CategoryPage): Promise<ResponsePage<RecipeDTO>> => {
  const total = await prisma.recipe.count({
    where: {
      categories: {
        every: {
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
        every: {
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
      photos_url: ['https://saborgostoso.com.br/wp-content/uploads/2020/08/WhatsApp-Image-2020-12-27-at-20.20.47.jpeg'],
      recipe_detail_url: '',
      toggle_like_url: ''
    }))
  }
}
