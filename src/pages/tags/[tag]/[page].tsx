import { Container } from '@material-ui/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Head from '~/components/molecules/Head'
import Pager from '~/components/molecules/Pager'
import Posts from '~/components/organisms/Posts'
import { POST_LIMIT_OF_PAGES } from '~/constants'
import { getAllPosts, getTags } from '~/static-api/contests'
import { Post } from '~/types'
import { range } from '~/utils/array'

export const config = { amp: 'hybrid' }

type Query = {
  tag: string
  page?: string
}

interface Pager {
  page: number
  count: number
}

interface Props {
  posts: Post[]
  pager: Pager
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getTags()
  const posts = getAllPosts()

  const paths = tags.flatMap(tag => {
    const postCount = posts.filter(post => post.tags.includes(tag)).length
    const pages = Math.ceil(postCount / POST_LIMIT_OF_PAGES)

    return range(pages).map(i => `/tags/${tag}/p${i + 1}`)
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const posts = getAllPosts().filter(post => post.tags.includes(params?.tag!))
  const count = Math.ceil(posts.length / POST_LIMIT_OF_PAGES)
  const page = +params?.page?.slice(1)! || 1
  const start = POST_LIMIT_OF_PAGES * (page - 1)

  const props = {
    posts: posts.slice(start, start + POST_LIMIT_OF_PAGES),
    pager: { page, count },
  }

  return { props }
}

const TagsPage = ({ posts, pager }: Props) => {
  const router = useRouter()
  const { tag, page } = router.query as Query

  useEffect(() => {
    if (page === 'p1') {
      router.replace(`/tags/${tag}`)
    }
  }, [tag, page, router])

  return (
    <Container component="main">
      <Head title={`「${tag}」の検索結果`} description={`「${tag}」の検索結果`} />
      <p>「{tag}」の検索結果</p>
      <Posts posts={posts} />
      <Pager page={pager.page} count={pager.count} basePath={`/tags/${tag}/`} />
    </Container>
  )
}

export default TagsPage
