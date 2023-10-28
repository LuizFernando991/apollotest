import { Product as PrismaProduct } from '@prisma/client'
// import { Category } from 'src/category/models/category.entity'

export class Product implements PrismaProduct {
  id: string
  name: string
  categoryId: string
  description: string
  price: number
  color: string
  promotionalPrice: number
  createdAt: Date
  updatedAt: Date

  // category: Category
}
