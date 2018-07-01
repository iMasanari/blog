import React from 'react'
import { withRouteData, Head } from 'react-static'
import Posts from '../components/Posts'
import { title } from '../constants'
import { Post } from '../types'

interface Props {
  posts: Post[]
  tag?: string
}

export default withRouteData(
  ({ posts }: Props) =>
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Posts posts={posts} />
    </div>
)
