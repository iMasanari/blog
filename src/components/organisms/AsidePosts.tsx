import { css, Theme } from '@emotion/react'
import { Typography } from '@mui/material'
import Tags from '../molecules/Tags'
import Posts from './Posts'
import { Post } from '~/types'

const asideStyle = (theme: Theme) => css`
  margin: ${theme.spacing(4, 'auto')};
`

interface Props {
  tags: string[]
  posts: Post[]
}

export default function AsidePosts({ tags, posts }: Props) {
  return (
    <aside css={asideStyle}>
      <header>
        <Typography variant="h5" component="h1">同じタグを含む記事</Typography>
        <Tags tags={tags} />
      </header>
      <main>
        <Posts posts={posts} />
      </main>
    </aside>
  )
}
