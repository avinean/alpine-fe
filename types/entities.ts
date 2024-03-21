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
  products: ProductEntity[]
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
  applications: ApplicationEntity[]
  createdAt: Date
  updatedAt: Date
  status: VisibilityStatus
  category: CategoryEntity
  brand: BrandEntity
  prices: PriceEntity[]
}

export interface ColorEntity {
  id: number
  slug: string
  title: string
  value: string
  image?: string
  createdAt: Date
  updatedAt: Date
  prices: PriceEntity[]
}

export interface ParameterEntity {
  id: number
  slug: string
  type: string
  unit?: string
  value?: string
  createdAt: Date
  updatedAt: Date
  prices: PriceEntity[]
}

export interface ApplicationEntity {
  id: number
  slug: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  products: ProductEntity[]
}

export interface PageEntity {
  id: number
  slug: string
  title: string
  content?: string
  status: VisibilityStatus
  createdAt: Date
  updatedAt: Date
}

export interface ContactEntity {
  id: number
  address: string
  phones: string
  emails: string
  status: VisibilityStatus
  createdAt: Date
  updatedAt: Date
}

export interface ServiceEntity {
  id: number
  title: string
  description: string
  image: string
  status: VisibilityStatus
  createdAt: Date
  updatedAt: Date
}

export interface PriceEntity {
  article: string
  price: number
  color: ColorEntity
  parameters: ParameterEntity[]
  product: ProductEntity
}
