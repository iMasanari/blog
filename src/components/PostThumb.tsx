import React from 'react'
import { Link } from 'react-static'
import { Post } from '../types'
import PostTags from './PostTags'
import './PostThumb.css'

interface Props {
  post: Post
}

export default ({ post }: Props) =>
  <article>
    <span>{post.date}</span>
    <h1 className="PostThumb-title">
      <Link to={`/blog/${post.slug}`}>
        {post.title}
      </Link>
    </h1>
    <PostTags tags={post.tags} />
  </article>
