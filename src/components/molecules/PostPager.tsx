import { Container } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import Link from '../atoms/Link'
import { Post } from '~/types'

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  prev: {
    flex: 1,
    paddingLeft: 0,
    justifyContent: 'flex-end',
  },
  next: {
    flex: 1,
    paddingRight: 0,
  },
  home: {
    borderLeft: '1px solid #6c6c6c',
    borderRight: '1px solid #6c6c6c',
  },
}))

interface Props {
  prev?: Pick<Post, 'title' | 'slug'> | null
  next?: Pick<Post, 'title' | 'slug'> | null
}

export default function PostPager({ prev, next }: Props) {
  const classes = useStyles()

  return (
    <Container className={classes.list}>
      <div className={`${classes.item} ${classes.prev}`}>
        {prev ? <Link href={`/blog/${prev.slug}`} variant="body1">{prev.title}</Link> : null}
      </div>
      <div className={`${classes.item} ${classes.home}`}>
        <Link href="/" variant="body1">HOME</Link>
      </div>
      <div className={`${classes.item} ${classes.next}`}>
        {next ? <Link href={`/blog/${next.slug}`} variant="body1">{next.title}</Link> : null}
      </div>
    </Container>
  )
}
