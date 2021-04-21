import {SingleBar } from 'cli-progress'
import {green,cyan,yellow } from 'colors'
import faker from 'faker'

import { Prisma, PrismaClient,PrismaPromise } from '@prisma/client'

import { Password } from '../src/utils/password'

import recipes from './recipes.json'

const progress = new SingleBar({
  format: `${yellow('{value}/{total}')} | ${green('{bar}')} | ${cyan('{step}')}`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

faker.setLocale('pt_BR')

const prisma = new PrismaClient()

type TimestampsDeleteManyArgs ={
  where?:{
    createdAt?: Prisma.DateTimeFilter | Date | string
  }
}

interface PrismaDelegate<GlobalRejectSettings>{
  deleteMany<T extends TimestampsDeleteManyArgs>(
    args?: Prisma.SelectSubset<T, TimestampsDeleteManyArgs>
  ) : PrismaPromise<Prisma.BatchPayload>
}


async function clear<T>(name:string, prismaDelegate:PrismaDelegate<T>) {
  progress.update({
    step: `Cleaning ${name}`
  })
  await prismaDelegate.deleteMany({
    where:{
      createdAt:{
        lt: new Date()
      }
    },
    
  })
}

async function main() {

  progress.start(3, 0, {
    step: "Initializing"
  });

  // await clear('Recipe',prisma.recipe)
  // await clear('Category',prisma.category)
  // await clear('User',prisma.user)

  progress.increment({
    step: "Seeding User"
  });

  for(let i=0; i< 30; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    await prisma.user.create({
      data:{
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName.toLowerCase(), lastName.toLowerCase()),
        birthDate: faker.date.between(new Date(1990,1,1), new Date(2002,12,31)),
        passwordHash : await Password.encode('12345678')
      }
    })
  }

  progress.increment({
    step: "Seeding Category"
  });

  const categories = ["bolos e tortas doces",
    "carnes",
    "aves",
    "peixes e frutos do mar",
    "saladas",
    "molhos e acompanhamentos",
    "sopas",
    "massas",
    "bebidas",
    "doces e sobremesas",
    "lanches",
    "prato único",
    "light",
    "alimentação saudável"
  ]

  for(let i= 0; i< categories.length; i++){
    const { id } = await prisma.category.create({
      data:{
        name: categories[i]
      }
    })
    
    for(let i = 0; i < 10; i++) {
      const recipeData = recipes[0]
      recipeData.categories.push({
        id
      })
  
      const { name,description,categories, preparation, ingredients, preparation_time: preparationTime } = recipeData
      
      const owner = await prisma.user.findFirst()

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
    }

  }

  progress.increment({
    step: "Finished"
  })
}

main()
.catch(e => {
  progress.stop()
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect()
  progress.stop()
  process.exit(0)
})