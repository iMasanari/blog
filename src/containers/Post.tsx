import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'
import convert from 'htmr'
import PostTags from '../components/PostTags'

interface Props {
  post: Post
}

export default withRouteData(
  ({ post }: Props) =>
    <article>
      <span>{post.date}</span>
      <h1>{post.title}</h1>
      <PostTags tags={post.tags} />
      {convert(post.contents)}
    </article>
)
