import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/categoty.module'

@Module({
  imports: [PrismaModule, ProductModule, CategoryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
