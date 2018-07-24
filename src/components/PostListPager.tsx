import { h } from 'hyperapp'
import { Link } from '../routing/Link'
import './PostListPager.css'

export interface Props {
  page: number
  max: number
}

const range = (n: number) => {
  const arr = new Array(n);

  for (let i = 0; i < n; ++i) arr[i] = i

  return arr
}

export default ({ page, max }: Props) =>
  <div class="PostListPager">
    {range(max).map((i) =>
      i + 1 === page
        ? <span class="PostListPager-item">{i + 1}</span>
        : <Link class="PostListPager-item" to={i ? `/p${i + 1}/` : '/'}>{i + 1}</Link>
    )}
  </div>
