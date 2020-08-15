import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Head } from '~/components/molecules/Head'
import { Pager } from '~/components/molecules/Pager'
import { POST_LIMIT_OF_PAGES } from '~/constants'
import { getAllPosts } from '~/static-api/contests'
import { range } from '~/utils/array'
import { PostThumb } from '../components/molecules/PostHeader'
import { Posts } from '../components/organisms/Posts'

type Query = {
  page?: string
}

interface Props {
  posts: PostThumb[]
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
  const max = Math.ceil(posts.length / POST_LIMIT_OF_PAGES)
  const current = +params?.page?.slice(1)! || 1
  const start = POST_LIMIT_OF_PAGES * (current - 1)

  const props = {
    posts: posts.slice(start, start + POST_LIMIT_OF_PAGES),
    pager: { max, current },
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
    <main>
      <Head description="技術ブログ改め、Qiitaの下書き" />
      <Posts posts={posts} />
      <Pager pager={pager} />
    </main>
  )
}

export default Page
