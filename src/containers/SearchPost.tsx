import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'
import PostThumb from '../components/PostThumb'

interface Props {
  tag: string
  posts: Post[]
}

export default withRouteData(
  ({ tag, posts }: Props) =>
    <div>
      <p>「{tag}」の検索結果</p>
      <ul>
        {posts.map((post) =>
          <li key={post.slug}>
            <PostThumb post={post} />
          </li>
        )}
      </ul>
    </div>
)
