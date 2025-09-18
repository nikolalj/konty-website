import type { PageCollectionItemBase } from '@nuxt/content'

export interface BlogPost extends PageCollectionItemBase {
  title: string
  description: string
  date: string
  author?: string
  readTime?: string
  image?: string
  category?: string
  featured?: boolean
  updatedAt?: string
}