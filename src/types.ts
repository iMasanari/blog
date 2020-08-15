export interface Post {
  title: string
  description: string
  slug: string
  tags: string[]
  body: string
  date: string
  image?: string
  draft?: boolean
}
