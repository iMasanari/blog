import matter from 'gray-matter'
import { toHTML } from './markdown'
import { Post } from '~/domains/post'

const getPosts = () => {
  const contexts = require.context('contents/posts/', true, /^(?!\.\/).*\.mdx?$/i)

  return contexts.keys().map(path => {
    const contents = contexts(path).default
    const { content, data } = matter(contents)

    const post: Post = {
      title: data.title,
      description: data.description ?? '',
      slug: data.slug,
      tags: data.tags ?? [],
      date: data.date?.toISOString(),
      update: data.update?.toISOString() ?? null,
      image: data.image ?? null,
      draft: data.draft ?? false,
    }

    return { post, content }
  })
}

export const getAllPosts = () => {
  const posts = getPosts()

  return posts.map(v => v.post).sort((a, b) => a.date > b.date ? -1 : 1)
}

export const getPostContent = (slug: string) => {
  const post = getPosts().find(v => v.post.slug === slug)

  if (!post) {
    throw new Error(`slug: ${slug} is not found`)
  }

  return toHTML(post.content)
}

export const getTags = () => {
  const posts = getAllPosts()

  return posts.flatMap(v => v.tags).sort()
}
