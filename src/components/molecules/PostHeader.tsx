import { css, Theme } from '@emotion/react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Post } from '../../types'
import Link from '../atoms/Link'
import Time from '../atoms/Time'
import Tags from './Tags'

const createAtStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  margin: ${theme.spacing(1, 0)};
`

interface Props {
  post: Post
  link?: boolean
}

export default function PostHeader({ post, link }: Props) {
  return (
    <header>
      <div css={createAtStyle}>
        <Tooltip title="作成日" placement="top" arrow>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
        </Tooltip>
        <Time dateTime={post.date} />
        {post.update && (
          <>
            <Tooltip title="最終更新日" placement="top" arrow>
              <EditIcon fontSize="small" sx={{ ml: 2, mr: 0.5 }} />
            </Tooltip>
            <Time dateTime={post.update} />
          </>
        )}
      </div>
      <Typography component="h1" variant="h5" gutterBottom>
        {!link ? post.title : (
          <Link href={`/blog/${post.slug}/`}>
            {post.title}
          </Link>
        )}
      </Typography>
      <Tags tags={post.tags} />
    </header>
  )
}
