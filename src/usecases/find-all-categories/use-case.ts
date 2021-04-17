import { Page, ResponsePage } from '@/usecases/types'
import { prisma } from '@/utils/prisma'

import { CategoryDTO } from './dto'

export const findAllCategories = async ({ limit, offset }: Page): Promise<ResponsePage<CategoryDTO>> => {
  const total = await prisma.category.count()

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true
    },
    skip: offset,
    take: limit
  })

  return {
    total,
    data: categories.map<CategoryDTO>(({ id, name }) => ({
      id,
      name,
      recipes_url: ''
    }))
  }
}
