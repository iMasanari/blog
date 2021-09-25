import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { Post } from '../../types'
import Link from '../atoms/Link'
import Time from '../atoms/Time'
import Tags from './Tags'

const useStyles = makeStyles(theme => ({
  createAt: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}))

interface Props {
  post: Post
  link?: boolean
}

export default function PostHeader({ post, link }: Props) {
  const classes = useStyles()

  return (
    <header>
      <div className={classes.createAt}>
        <CalendarTodayIcon fontSize="small" className={classes.icon} />
        <Time dateTime={post.date} />
      </div>
      <Typography component="h1" variant="h5" gutterBottom>
        {!link ? post.title : (
          <Link href={`/blog/${post.slug}/`} >
            {post.title}
          </Link>
        )}
      </Typography>
      <Tags tags={post.tags} />
    </header>
  )
}
