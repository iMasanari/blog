interface FrontMatter {
  title: string
  description: string
  slug: string
  date: string
  tags: string[]
}

interface MDXModule {
  default: () => JSX.Element
  frontMatter: FrontMatter
}

const getPosts = () => {
  const contexts = require.context('@/contents/posts/', true, /\.mdx?$/)

  return contexts.keys().map((path) => {
    const { frontMatter } = contexts(path) as MDXModule

    return frontMatter
  })
}

export const getAllPosts = () => {
  const posts = getPosts()

  return posts.sort((a, b) => a.date > b.date ? -1 : 1)
}

export const getPost = (slug: string) => {
  const posts = getPosts()
  const post = posts.find(v => v.slug === slug)

  if (!post) throw new Error

  return post
}

export const getTags = () => {
  const posts = getPosts()

  return posts.flatMap(v => v.tags).sort()
}
