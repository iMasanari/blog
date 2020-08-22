import Link from 'next/link'
import { Post } from '../../types'
import { Time } from '../atoms/Time'
import { Tags } from './Tags'

export type PostThumb = Omit<Post, 'body'>

interface Props {
  post: PostThumb
  link?: boolean
}

export const PostHeader = ({ post, link }: Props) =>
  <header>
    <Time dateTime={post.date} />
    <h1>
      {!link ? post.title : (
        <Link href="/blog/[slug]/" as={`/blog/${post.slug}/`}>
          <a>{post.title}</a>
        </Link>
      )}
    </h1>
    <Tags tags={post.tags} />
  </header>
