import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'
import PostThumb from '../components/PostThumb'
import "./Posts.css"

interface Props {
  posts: Post[]
  tag?: string
}

export default withRouteData(
  ({ posts, tag }: Props) =>
    <div>
      {tag ? <p>「{tag}」の検索結果</p> : null}
      <ul className="Posts-ul">
        {posts.map((post) =>
          <li key={post.slug} className="Posts-li">
            <PostThumb post={post} />
          </li>
        )}
      </ul>
    </div>
)
