import React from 'react'
import { withRouteData, Head } from 'react-static'
import { Post } from '../types'
import convert from 'htmr'
import PostTags from '../components/PostTags'
import { title } from '../constants'

interface Props {
  post: Post
}

export default withRouteData(
  ({ post }: Props) =>
    <article>
      <Head>
        <title>{post.title} - {title}</title>
      </Head>
      <span>{post.date}</span>
      <h1>{post.title}</h1>
      <PostTags tags={post.tags} />
      {convert(post.contents)}
    </article>
)
