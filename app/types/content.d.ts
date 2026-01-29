import type { PageCollectionItemBase } from '@nuxt/content'

export type ContentCollectionType = 'content_rs' | 'content_me' | 'content_ba' | 'content_us'
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
