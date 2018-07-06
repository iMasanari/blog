import React from 'react'
import PostThumb, { PostThumb as PostThumbType } from '../components/PostThumb'
import './Posts.css'

interface Props {
  posts: PostThumbType[]
}

export default ({ posts }: Props) =>
  <ul className="Posts">
    {posts.map((post) =>
      <li key={post.slug} className="Posts-li">
        <PostThumb post={post} />
      </li>
    )}
  </ul>
