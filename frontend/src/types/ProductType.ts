export type Product = {
  id: string
  name: string
  description: string
  categoryId: string
  price: number
  color: string
  promotionalPrice: number
  createdAt: Date
  updatedAt: Date
  category?: {
    name: string
    id: string
  }
}
