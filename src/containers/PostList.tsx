import React from 'react'
import { withRouteData } from 'react-static'
import Posts from '../components/Posts'
import { Post } from '../types'

interface Props {
  posts: Post[]
  tag?: string
}

export default withRouteData(
  ({ posts }: Props) =>
    <div>
      <Posts posts={posts} />
    </div>
)
