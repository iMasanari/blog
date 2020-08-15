import Link from 'next/link'
import css from 'styled-jsx/css'

interface Props {
  tags: string[]
}

export const Tags = ({ tags }: Props) =>
  <ul className="Tags">
    {tags.map((tag) =>
      <li key={tag} className="item">
        <Link href="/tags/[tag]/" as={`/tags/${tag}/`}>
          <a className="link">#{tag}</a>
        </Link>
      </li>
    )}
    <style jsx>{styles}</style>
  </ul>

const styles = css`
.Tags {
  padding: 0;
}

.item {
  display: inline;
  margin: 0 0.2em;
}

.link {
  color: var(--color-text-secondary);
}
`
