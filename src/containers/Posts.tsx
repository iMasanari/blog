import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'
import PostThumb from '../components/PostThumb'

interface Props {
  posts: Post[]
  tag?: string
}

export default withRouteData(
  ({ posts, tag }: Props) =>
    <div>
      {tag ? <p>「{tag}」の検索結果</p> : null}
      <ul>
        {posts.map((post) =>
          <li key={post.slug}>
            <PostThumb post={post} />
          </li>
        )}
      </ul>
    </div>
)
