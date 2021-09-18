import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { Post as IPost } from '~/types'

const getPosts = () => {
  const contexts = require.context('contents/posts/', true, /^(?!\.\/).*\.mdx?$/)

  return contexts.keys().map(path => {
    const contents = readFileSync(path, 'utf-8')
    const { content, data } = matter(contents)
    const post = {} as Record<string, any>

    const list = Object.keys(data)

    Object.keys(data).forEach((key) => {
      post[key] = data[key] instanceof Date ? data[key].toISOString() : data[key]
    })

    return { post: post as IPost, content }
  })
}

export const getAllPosts = () => {
  const posts = getPosts()

  return posts.map(v => v.post).sort((a, b) => a.date > b.date ? -1 : 1)
}

export const getPostContent = (slug: string) => {
  const post = getPosts().find(v => v.post.slug === slug)

  return post?.content
}

export const getTags = () => {
  const posts = getAllPosts()

  return posts.flatMap(v => v.tags).sort()
}
