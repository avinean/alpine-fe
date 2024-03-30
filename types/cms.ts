import type { Sizes } from './ds'
import type { GalleryEntity } from './entities'

export interface TextSection {
  type: 'text'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'ul'
  align: 'left' | 'center' | 'right'
  content: string
}

export interface ImageSection {
  type: 'image'
  aspectRatio: 'auto' | 1
  image: GalleryEntity | null
}

export interface GridSection {
  type: 'grid'
  columns: {
    [S in Sizes]: 1 | 2 | 3 | 4 | 5 | 6
  }
  groups: CmsSection[][]
}

export interface CardSection {
  type: 'card'
  image: GalleryEntity | null
  sections: CmsSection[]
}

export type CmsSection = TextSection | ImageSection | GridSection | CardSection

export interface CmsEntity {
  id: number
  slug: string
  title: string
  content: CmsSection[]
  createdAt: Date
  updatedAt: Date
}
