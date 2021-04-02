import { RegisterAsyncCallback } from 'validatorjs'

import { prisma } from '@/utils/prisma'
import { getParametersAsStringArray } from '@/validators/utils'

export const unique: RegisterAsyncCallback = (value,args,_,passes): void => {
  const [table, field] = getParametersAsStringArray(args)

  prisma.$queryRaw(`SELECT 1 FROM ${table} WHERE ${field} = $1`, value)
    .then((value: []) => passes(value.length === 0))
    .catch(() => passes(false))
}
