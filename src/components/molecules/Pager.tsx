import { makeStyles } from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import React from 'react'
import LinkBehavior from '../atoms/LinkBehavior'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Props {
  page: number
  count: number
  basePath: string
}

export default function Pager({ page, count, basePath }: Props) {
  const classes = useStyles()

  return (
    <Pagination
      className={classes.root}
      page={page}
      count={count}
      renderItem={(item) =>
        <PaginationItem
          component={LinkBehavior}
          href={`${basePath}${item.page === 1 ? '' : `p${item.page}`}`}
          {...item}
        />
      }
    />
  )
}
