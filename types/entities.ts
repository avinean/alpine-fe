import type { BrandType, VisibilityStatus } from './enums'

export interface BrandEntity {
  id: number
  title: string
  description: string
  image: string
  type: BrandType
  createdAt: Date
  updatedAt: Date
  status: VisibilityStatus
  categories: CategoryEntity[]
}

export interface CategoryEntity {
  id: number
  title: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
  status: VisibilityStatus
  brand: BrandEntity
  products: ProductEntity[]
}

export interface ProductEntity {
  id: number
  title: string
  description: string
  size: string
  application: string
  standart: string
  image: string
  price: number
  createdAt: Date
  updatedAt: Date
  status: VisibilityStatus
  category: CategoryEntity
}
