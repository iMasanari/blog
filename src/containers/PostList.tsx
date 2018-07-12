import { h } from 'hyperapp'
import Posts from '../components/Posts'
import { PostThumb } from '../components/PostThumb'

interface Props {
  posts: PostThumb[]
}

export default ({ posts }: Props) =>
  <div>
    <Posts posts={posts} />
  </div>
