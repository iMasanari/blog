import { Container } from '@material-ui/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Posts from '../components/organisms/Posts'
import Head from '~/components/molecules/Head'
import Pager from '~/components/molecules/Pager'
import { POST_LIMIT_OF_PAGES } from '~/constants'
import { getAllPosts } from '~/static-api/contests'
import { Post } from '~/types'
import { range } from '~/utils/array'

export const config = { amp: 'hybrid' }

type Query = {
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
  const posts = getAllPosts()
  const pages = Math.ceil(posts.length / POST_LIMIT_OF_PAGES)
  const paths = range(pages)
    .map(i => `/p${i + 1}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const posts = getAllPosts()
  const count = Math.ceil(posts.length / POST_LIMIT_OF_PAGES)
  const page = +params?.page?.slice(1)! || 1
  const start = POST_LIMIT_OF_PAGES * (page - 1)

  const props = {
    posts: posts.slice(start, start + POST_LIMIT_OF_PAGES),
    pager: { count, page },
  }

  return { props }
}

const Page = ({ posts, pager }: Props) => {
  const router = useRouter()
  const { page } = router.query as Query

  useEffect(() => {
    if (page === 'p1') {
      router.replace('/')
    }
  }, [page, router])

  return (
    <Container component="main">
      <Head description="技術ブログ改め、Qiitaの下書き" />
      <Posts posts={posts} />
      <Pager page={pager.page} count={pager.count} basePath="/" />
    </Container>
  )
}

export default Page
