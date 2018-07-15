import { h } from 'hyperapp'
import Posts from '../components/Posts'
import { PostThumb } from '../components/PostThumb'
import { Link } from '../routing/Link'

interface Props {
  posts: PostThumb[]
  tag: string
}

export default ({ posts, tag }: Props) =>
  <div>
    <div>
      <Link to="/">TOP</Link>
      {' > '}
      <span>{tag}</span>
    </div>
    <p>「{tag}」の検索結果</p>
    <Posts posts={posts} />
  </div>
