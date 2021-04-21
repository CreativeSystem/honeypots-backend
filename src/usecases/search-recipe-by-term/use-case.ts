import { prisma } from '@/utils/prisma'
import { Validate } from '@/utils/validate-parameter'

import { SearchResponse, RecipeDTO, SearchRequest } from './dto'

export const searchRecipeByTerm = async ({ limit = 5, offset = 0,searchTerm }: SearchRequest): Promise<SearchResponse<RecipeDTO>> => {
  Validate.parameterNotNullOrUndefined('searchTerm', searchTerm)

  const total = await prisma.recipe.count({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
  })

  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      images: {
        select: {
          id: true
        }
      }
    },
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    skip: offset,
    take: limit
  })

  return {
    total,
    auto_correction: [],
    data: recipes.map<RecipeDTO>(({ id, name, images = [] }) => (
      {
        id,
        name,
        photos_url: ['https://saborgostoso.com.br/wp-content/uploads/2020/08/WhatsApp-Image-2020-12-27-at-20.20.47.jpeg']
      }
    ))
  }
}
