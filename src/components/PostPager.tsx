import { h } from 'hyperapp'
import { Link } from '../routing/Link'
import { blogUrl } from '../constants'
import { Post } from '../types'
import './PostPager.css'

interface Props {
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

export default ({ prev, next }: Props) =>
  <div class="PostPager">
    <div class="PostPager-item">
      {prev ? <Link to={`${blogUrl}/${prev.slug}/`}>{prev.title}</Link> : null}
    </div>
    <div class="PostPager-item">
      <Link to="/">HOME</Link>
    </div>
    <div class="PostPager-item">
      {next ? <Link to={`${blogUrl}/${next.slug}/`}>{next.title}</Link> : null}
    </div>
  </div>
