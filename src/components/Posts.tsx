import { h } from 'hyperapp'
import PostThumb, { PostThumb as PostThumbType } from '../components/PostThumb'
import './Posts.css'

interface Props {
  posts: PostThumbType[]
}

export default ({ posts }: Props) =>
  <ul class="Posts">
    {posts.map((post) =>
      <li key={post.slug} class="Posts-li nes-container is-rounded">
        <PostThumb post={post} />
      </li>
    )}
  </ul>
