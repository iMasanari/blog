import { h } from 'hyperapp'
import { Link } from '../routing/Link'
import './PostTags.css'

interface Props {
  tags: string[]
}

export default ({ tags }: Props) =>
  <ul class="PostTags">
    {tags.map((tag) =>
      <li key={tag} class="PostTags-li">
        <Link class="PostTags-Link" to={`/tags/${tag}/`}>{tag}</Link>
        {' '}
      </li>
    )}
  </ul>
