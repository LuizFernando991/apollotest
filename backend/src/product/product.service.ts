import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { CategoryService } from 'src/category/category.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId
    )

    if (!category) {
      throw new HttpException(
        {
          message: ['Category not found.'],
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Category not found.'
        },
        HttpStatus.NOT_FOUND
      )
    }

    const newProduct = await this.prisma.product.create({
      data: {
        ...createProductDto,
        promotionalPrice: +(
          createProductDto.price -
          createProductDto.price * (category.discont / 100)
        ).toFixed(2)
      },
      include: {
        category: { select: { id: true, name: true, discont: true } }
      }
    })

    return newProduct
  }

  async findAll(
    page: number,
    search: string,
    orderByFilter: string,
    categoriesFilter: string[]
  ) {
    const limit = 20
    const skip = (page - 1) * limit

    const orderBy: Prisma.ProductOrderByWithRelationInput = {}
    let where: Prisma.ProductWhereInput = {}

    if (orderByFilter === 'name') {
      orderBy.name = 'asc'
    } else if (orderByFilter === 'createDate') {
      orderBy.createdAt = 'asc'
    }

    if (search) {
      where = {
        ...where,
        name: { contains: search, mode: 'insensitive' }
      }
    }

    if (categoriesFilter.length > 0) {
      where = {
        ...where,
        categoryId: {
          in: categoriesFilter
        }
      }
    }

    const totalProducts = await this.prisma.product.count({ where })

    const totalPages = Math.ceil(totalProducts / limit)

    const products = await this.prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            discont: true
          }
        }
      }
    })

    return {
      products,
      pages: totalPages,
      currentPage: page
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.product.delete({
        where: { id }
      })
    } catch (err) {
      if (err.code === 'P2025') {
        throw new HttpException(
          {
            message: ['Product not found.'],
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Product not found.'
          },
          HttpStatus.NOT_FOUND
        )
      }
      throw new HttpException(
        {
          message: ['Internal Error.'],
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Error.'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
