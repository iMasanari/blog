import css from 'styled-jsx/css'
import { PostHeader, PostThumb } from '../molecules/PostHeader'

interface Props {
  posts: PostThumb[]
}

export const Posts = ({ posts }: Props) =>
  <ul className="Posts">
    {posts.map((post) =>
      <li key={post.slug} className="Posts-item">
        <article>
          <PostHeader post={post} link />
        </article>
      </li>
    )}
    <style jsx>{styles}</style>
  </ul>

const styles = css`
.Posts {
  list-style: none;
  padding: 0;
}

.Posts-item {
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  border: 1px solid #bbb;
}
`
