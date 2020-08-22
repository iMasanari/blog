import { renderToStaticMarkup } from 'react-dom/server'

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

const getModules = () => {
  const contexts = require.context('@/contents/posts/', true, /\.mdx?$/)

  return contexts.keys().map((path) => {
    const { default: Component, frontMatter } = contexts(path) as MDXModule

    return { post: frontMatter, Component }
  })
}

export const getAllPosts = () => {
  const modules = getModules()

  return modules.map(v => v.post).sort((a, b) => a.date > b.date ? -1 : 1)
}

export const getPost = (slug: string) => {
  const modules = getModules()
  const module = modules.find(v => v.post.slug === slug)

  if (!module) throw new Error

  const { post, Component } = module
  const body = renderToStaticMarkup(<Component />)

  return { ...post, body }
}

export const getTags = () => {
  const modules = getModules()

  return modules.flatMap(v => v.post.tags).sort()
}
