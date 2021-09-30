import { css } from '@emotion/react'
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@mui/material'
import React from 'react'
import LinkBehavior from '../atoms/LinkBehavior'

const pagerStyle = css`
  display: flex;
  justify-content: center;
`

interface Props {
  page: number
  count: number
  basePath: string
}

export default function Pager({ page, count, basePath }: Props) {
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
      css={pagerStyle}
      page={page}
      count={count}
      renderItem={renderItem}
    />
  )
}
