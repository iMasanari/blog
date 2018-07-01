import React from 'react'
import PostThumb from '../components/PostThumb'
import { Post } from '../types'
import './Posts.css'

interface Props {
  posts: Post[]
}

export default ({ posts }: Props) =>
  <ul className="Posts">
    {posts.map((post) =>
      <li key={post.slug} className="Posts-li">
        <PostThumb post={post} />
      </li>
    )}
  </ul>
