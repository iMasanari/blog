import Link from 'next/link'
import css from 'styled-jsx/css'
import { Post } from '~/types'

interface Props {
  prev?: Pick<Post, 'title' | 'slug'> | null
  next?: Pick<Post, 'title' | 'slug'> | null
}

export const PostPager = ({ prev, next }: Props) =>
  <div className="PostPager">
    <div className="item">
      {prev ? <Link href="/blog/[slug]" as={`/blog/${prev.slug}`}><a>{prev.title}</a></Link> : null}
    </div>
    <div className="item home">
      <Link href="/"><a>HOME</a></Link>
    </div>
    <div className="item">
      {next ? <Link href="/blog/[slug]" as={`/blog/${next.slug}`}><a>{next.title}</a></Link> : null}
    </div>
    <style jsx>{styles}</style>
  </div>

const styles = css`
.PostPager {
  display: table;
  max-width: var(--width-content);
  margin: 2rem auto;
}

.item {
  box-sizing: border-box;
  display: table-cell;
  width: 33.3%;
  padding: 0.5rem;
  text-align: center;
  vertical-align: middle;
}

.home {
  border-left: 1px solid #6c6c6c;
  border-right: 1px solid #6c6c6c;
}
`
