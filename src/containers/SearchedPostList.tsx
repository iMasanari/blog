import React from 'react'
import { withRouteData, Link } from 'react-static'
import Posts from '../components/Posts'
import { Post } from '../types'

interface Props {
  posts: Post[]
  tag: string
}

export default withRouteData(
  ({ posts, tag }: Props) =>
    <div>
      <div>
        <Link to="/">TOP</Link>
        {' > '}
        <span>{tag}</span>
      </div>
      <p>「{tag}」の検索結果</p>
      <Posts posts={posts} />
    </div>
)
