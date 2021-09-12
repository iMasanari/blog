import { makeStyles } from '@material-ui/core'
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab'
import React from 'react'
import LinkBehavior from '../atoms/LinkBehavior'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
})

interface Props {
  page: number
  count: number
  basePath: string
}

export default function Pager({ page, count, basePath }: Props) {
  const classes = useStyles()

  const renderItem = (item: PaginationRenderItemParams) => {
    if (item.page <= 0 || count < item.page) {
      return <PaginationItem component="span" {...item} />
    }

    return (
      <PaginationItem
        component={LinkBehavior}
        href={`${basePath}${item.page === 1 ? '' : `p${item.page}`}`}
        {...item}
      />
    )
  }

  return (
    <Pagination
      className={classes.root}
      page={page}
      count={count}
      renderItem={renderItem}
    />
  )
}
