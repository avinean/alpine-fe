import type { BrandType, VisibilityStatus } from './enums'

export interface BrandEntity {
  id: number
  slug: string
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
  slug: string
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
  slug: string
  title: string
  description: string
  size: string
  application: string
  standart: string
  image: string
  price: number
  tags: string
  colors: ColorEntity[]
  parameters: ParameterEntity[]
  createdAt: Date
  updatedAt: Date
  status: VisibilityStatus
  category: CategoryEntity
}

export interface ColorEntity {
  id: number
  slug: string
  title: string
  value: string
  image?: string
  createdAt: Date
  updatedAt: Date
  products: ProductEntity[]
}

export interface ParameterEntity {
  id: number
  slug: string
  type: string
  unit?: string
  value?: string
  createdAt: Date
  updatedAt: Date
  products: ProductEntity[]
}
