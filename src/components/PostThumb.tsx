import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Post } from '../types'
import PostTags from './PostTags'
import { blogUrl } from '../constants'
import './PostThumb.css'

export type PostThumb = Pick<Post, 'title' | 'slug' | 'date' | 'tags'>

interface Props {
  post: PostThumb
}

export default ({ post }: Props) =>
  <article>
    <span>{post.date}</span>
    <h1 class="PostThumb-title">
      <Link to={`${blogUrl}/${post.slug}/`}>
        {post.title}
      </Link>
    </h1>
    <PostTags tags={post.tags} />
  </article>
