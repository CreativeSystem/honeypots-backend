import { UseCaseError } from '@/errors'
import { prisma } from '@/utils/prisma'
import { Validate } from '@/utils/validate-parameter'

import { CategoryDTO } from '../find-all-categories/dto'
import { IngredientDTO, IngredientSectionDTO, PreparationDTO, PreparationSectionDTO, RecipeDetailDTO } from './dto'

export const findRecipeById = async (id: string): Promise<RecipeDetailDTO> => {
  Validate.parameterNotNullOrUndefined('id', id)

  const recipe = await prisma.recipe.findUnique({
    include: {
      owner: {
        select: {
          id: true,
          name: true
        }
      },
      categories: {
        select: {
          id: true,
          name: true
        }
      },
      sections: {
        select: {
          directions: true,
          ingredients: true
        }
      },
      images: {
        select: {
          id: true
        }
      }
    },
    where: {
      id
    }
  })

  if (!recipe) throw new UseCaseError(`Recipe with id ${id} not found`)

  return {
    id: recipe.id,
    name: recipe.name,
    preparation_time: recipe.preparationTime,
    likes_count: 0,
    liked: false,
    visualization_count: 0,
    visualized: false,
    photos_url: recipe.images.map(image => '' + id),
    owner: {
      name: recipe.owner.name,
      profile_url: ''
    },
    categories: recipe.categories.map<CategoryDTO>(category => (
      {
        id: category.id,
        name: category.name,
        recipes_url: ''
      }
    )),
    ingredients: recipe
      .sections
      .filter(section => section.ingredients)
      .map<IngredientSectionDTO>(section => ({
      section_name: '',
      section_ingredients: section.ingredients.map<IngredientDTO>(({ id, name,order,quantity,unit }) => ({
        id,
        name,
        order,
        quantity,
        unit
      }))
    })),
    preparation: recipe
      .sections
      .filter(section => section.directions)
      .map<PreparationSectionDTO>(section => ({
      section_name: '',
      section_steps: section.directions.map<PreparationDTO>(({ id, order, description }) => ({
        id, order, description
      }))
    }))
  }
}
