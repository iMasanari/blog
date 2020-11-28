import { GetStaticPaths, GetStaticProps } from 'next'
import { Head } from '~/components/molecules/Head'
import { PostThumb } from '~/components/molecules/PostHeader'
import { PostPager } from '~/components/molecules/PostPager'
import { AsidePosts } from '~/components/organisms/AsidePosts'
import { Post } from '~/components/organisms/Post'
import { SUGGEST_LIMIT } from '~/constants'
import { getAllPosts, getPost } from '~/static-api/contests'
import { Post as IPost } from '~/types'

export const config = { amp: 'hybrid' }

type Query = {
  slug: string
}

interface Props {
  post: IPost
  next: PostThumb | null
  prev: PostThumb | null
  sameTags: PostThumb[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = getAllPosts()
  const paths = contents.map(v => `/blog/${v.slug}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const posts = getAllPosts()
  const post = getPost(params?.slug!)
  const currentIndex = posts.findIndex(v => v.slug === post.slug)
  const next: PostThumb | null = posts[currentIndex - 1] || null
  const prev: PostThumb | null = posts[currentIndex + 1] || null

  const sameTags = posts
    .filter(v => v.slug !== post.slug && v.tags.some(tag => post.tags.includes(tag)))
    .slice(0, SUGGEST_LIMIT)

  const props = { post, next, prev, sameTags }

  return { props }
}

const Slug = ({ post, next, prev, sameTags }: Props) =>
  <div>
    <Head title={post.title} description={post.description} />
    <Post post={post} />
    <PostPager next={next} prev={prev} />
    {sameTags.length > 0 && (
      <AsidePosts tags={post.tags} posts={sameTags} />
    )}
  </div>

export default Slug
