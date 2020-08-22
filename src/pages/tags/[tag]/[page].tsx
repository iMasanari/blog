import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Head } from '~/components/molecules/Head'
import { Pager } from '~/components/molecules/Pager'
import { PostThumb } from '~/components/molecules/PostHeader'
import { Posts } from '~/components/organisms/Posts'
import { POST_LIMIT_OF_PAGES } from '~/constants'
import { getAllPosts, getTags } from '~/static-api/contests'
import { range } from '~/utils/array'

type Query = {
  tag: string
  page?: string
}

interface Props {
  posts: PostThumb[]
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
  const max = Math.ceil(posts.length / POST_LIMIT_OF_PAGES)
  const current = +params?.page?.slice(1)! || 1
  const start = POST_LIMIT_OF_PAGES * (current - 1)

  const props = {
    posts: posts.slice(start, start + POST_LIMIT_OF_PAGES),
    pager: { max, current },
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
    <main>
      <Head title={`「${tag}」の検索結果`} description={`「${tag}」の検索結果`} />
      <p>「{tag}」の検索結果</p>
      <Posts posts={posts} />
      <Pager pager={pager} basePath="/tags/[tag]" basePathAs={`/tags/${tag}`} />
    </main>
  )
}

export default TagsPage
