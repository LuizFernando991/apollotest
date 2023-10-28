import { Product } from '../models/product.entity'
import { IsString, Min, IsNumber, MaxLength } from 'class-validator'

export class CreateProductDto extends Product {
  @IsString()
  @MaxLength(25)
  name: string

  @IsString()
  @MaxLength(90)
  description: string

  @IsString()
  @MaxLength(25)
  color: string

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  categoryId: string
}
