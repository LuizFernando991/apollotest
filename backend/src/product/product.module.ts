import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CategoryModule } from 'src/category/categoty.module'

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
