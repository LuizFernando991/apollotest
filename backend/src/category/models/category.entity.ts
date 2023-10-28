import { Category as PrismaCategory } from '@prisma/client'

export class Category implements PrismaCategory {
  id: string
  name: string
  discont: number
}
