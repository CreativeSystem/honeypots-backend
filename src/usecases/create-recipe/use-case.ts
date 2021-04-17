import { prisma } from '@/utils/prisma'
import { validator } from '@/validators/validator-decorator'

import { CreateRecipeDTO, CreatedRecipeDTO } from './dto'
import { createRecipeRules } from './rules'

const createRecipe = async (recipeDto: CreateRecipeDTO): Promise<CreatedRecipeDTO> => {
  const { name,description,categories,owner, preparation, ingredients, preparation_time: preparationTime } = recipeDto

  const recipe = await prisma.recipe.create({
    data: {
      name,
      description,
      preparationTime,
      owner: {
        connect: {
          id: owner.id
        }
      },
      categories: {
        connect: categories
      }
    }
  })

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i]
    await prisma.recipeSection.create({
      data: {
        order: i,
        name: ingredient.section_name,
        ingredients: {
          createMany: {
            data: ingredient.section_ingredients
          }
        },
        recipe: {
          connect: {
            id: recipe.id
          }
        }
      }
    })
  }

  for (let i = 0; i < preparation.length; i++) {
    const direction = preparation[i]
    await prisma.recipeSection.create({
      data: {
        order: i,
        name: direction.section_name,
        directions: {
          createMany: {
            data: direction.section_steps
          }
        },
        recipe: {
          connect: {
            id: recipe.id
          }
        }
      }
    })
  }

  return {
    id: recipe.id
  }
}

export default validator(createRecipe,createRecipeRules)
