import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany()
    return categories
  }

  async findOne(categoryId: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId }
      })
      return category
    } catch (err) {
      return
    }
  }
}
