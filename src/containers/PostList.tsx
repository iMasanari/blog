import { h } from 'hyperapp'
import Posts from '../components/Posts'
import { PostThumb } from '../components/PostThumb'
import PostListPager, { Props as Pager } from '../components/PostListPager'

interface Props {
  posts: PostThumb[]
  pager: Pager
}

export default ({ posts, pager }: Props) =>
  <div class="nes-container shared-main-container">
    <Posts posts={posts} />
    <PostListPager page={pager.page} max={pager.max} />
  </div>
