import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Param
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string,
    @Query('categories') categories: string
  ) {
    const pageNumber = page ? +page : 1
    const categoriesFilter = categories ? categories.split(',') : []
    return this.productService.findAll(
      pageNumber,
      search,
      orderBy,
      categoriesFilter
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
