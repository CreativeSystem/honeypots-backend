import {SingleBar } from 'cli-progress'
import {green,cyan,yellow } from 'colors'
import faker from 'faker'

import { Prisma, PrismaClient,PrismaPromise } from '@prisma/client'

import {encode} from '../src/utils/password-encoder'

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
    }
  })
}

async function main() {

  progress.start(2, 0, {
    step: "Initializing"
  });

  await clear('Recipe',prisma.recipe)
  await clear('Category',prisma.category)
  await clear('User',prisma.user)

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
        passwordHash : await encode('12345678')
      }
    })
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