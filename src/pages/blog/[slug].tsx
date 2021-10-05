import { Container } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Head from '~/components/molecules/Head'
import PostPager from '~/components/molecules/PostPager'
import AsidePosts from '~/components/organisms/AsidePosts'
import Post from '~/components/organisms/Post'
import { SUGGEST_LIMIT } from '~/constants'
import { Post as IPost } from '~/domains/post'
import { getAllPosts, getPostContent } from '~/modules/posts'

export const config = { amp: 'hybrid' }

type Query = {
  slug: string
}

interface Props {
  post: IPost
  next: IPost | null
  prev: IPost | null
  sameTags: IPost[]
  content: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = getAllPosts()
  const paths = contents.map(v => `/blog/${v.slug}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const slug = params?.slug as string
  const posts = getAllPosts()

  const currentIndex = posts.findIndex(v => v.slug === slug)
  const post = posts[currentIndex]
  const next: IPost | null = posts[currentIndex - 1] || null
  const prev: IPost | null = posts[currentIndex + 1] || null

  const content = await getPostContent(slug)

  const sameTags = posts
    .filter(v => v.slug !== post.slug && v.tags.some(tag => post.tags.includes(tag)))
    .slice(0, SUGGEST_LIMIT)

  const props = { post, next, prev, sameTags, content }

  return { props }
}

export default function Slug({ post, next, prev, sameTags, content }: Props) {
  return (
    <Container>
      <Head title={post.title} description={post.description} />
      <Post post={post} content={content} />
      <PostPager next={next} prev={prev} />
      {sameTags.length > 0 && (
        <AsidePosts tags={post.tags} posts={sameTags} />
      )}
    </Container>
  )
}
