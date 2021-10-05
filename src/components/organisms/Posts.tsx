import { css, Theme } from '@emotion/react'
import PostHeader from '../molecules/PostHeader'
import { Post } from '~/domains/post'

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`

const itemStyle = (theme: Theme) => css`
  padding: ${theme.spacing(2, 3)};
  margin: ${theme.spacing(2, 0)};
  border: 1px solid #bbb;
`

interface Props {
  posts: Post[]
}

export default function Posts({ posts }: Props) {
  return (
    <ul css={listStyle}>
      {posts.map((post) =>
        <li key={post.slug} css={itemStyle}>
          <article>
            <PostHeader post={post} link />
          </article>
        </li>
      )}
    </ul>
  )
}
