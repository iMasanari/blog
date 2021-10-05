export interface Post {
  title: string
  description: string
  slug: string
  tags: string[]
  date: string
  update?: string
  image?: string
  draft?: boolean
}
