import { css, Theme } from '@emotion/react'
import React from 'react'
import Link from '../atoms/Link'
import { Post } from '~/types'

const listStyle = (theme: Theme) => css`
  display: flex;
  padding: 0;
  margin: ${theme.spacing(4, 0)};
`

const itemStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: ${theme.spacing(1, 2)};
  margin: 0;
`

const prevItemStyle = css`
  flex: 1;
  padding-left: 0;
  justify-content: flex-end;
`

const nextItemStyle = css`
  flex: 1;
  padding-right: 0;
`

const homeItemStyle = css`
  border-left: 1px solid #6c6c6c;
  border-right: 1px solid #6c6c6c;
`

interface Props {
  prev?: Pick<Post, 'title' | 'slug'> | null
  next?: Pick<Post, 'title' | 'slug'> | null
}

export default function PostPager({ prev, next }: Props) {
  return (
    <ul css={listStyle}>
      <li css={[itemStyle, prevItemStyle]}>
        {prev ? <Link href={`/blog/${prev.slug}`} variant="body1">{prev.title}</Link> : null}
      </li>
      <li css={[itemStyle, homeItemStyle]}>
        <Link href="/" variant="body1">HOME</Link>
      </li>
      <li css={[itemStyle, nextItemStyle]}>
        {next ? <Link href={`/blog/${next.slug}`} variant="body1">{next.title}</Link> : null}
      </li>
    </ul>
  )
}
