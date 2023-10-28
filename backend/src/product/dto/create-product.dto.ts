import { Product } from '../models/product.entity'
import { IsString, Min, IsNumber } from 'class-validator'

export class CreateProductDto extends Product {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  color: string

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  categoryId: string
}
