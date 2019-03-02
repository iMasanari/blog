import { h } from 'hyperapp'
import PostTags from './PostTags'
import { Link } from '../routing/Link'
import { blogUrl } from '../constants'
import { Post } from '../types'
import './AsidePosts.css'

interface Props {
  tags: string[]
  posts: Post[]
}

export default ({ tags, posts }: Props) =>
  <aside>
    <div class="AsidePosts-title">同じタグを含む記事</div>
    <PostTags tags={tags} />
    <ul class="AsidePosts-ul">
      {posts.map((post) =>
        <li class="AsidePosts-li" key={post.slug}>
          <Link to={`${blogUrl}/${post.slug}/`}>
            {post.title}
          </Link>
          <PostTags tags={post.tags.filter((tag) => ~tags.indexOf(tag))} />
        </li>
      )}
    </ul>
  </aside>
