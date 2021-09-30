import { css } from '@emotion/react'
import React, { ReactNode } from 'react'
import Link from '../atoms/Link'

const listStyle = css`
  padding: 0;
  margin: 0;
`

const itemStyle = css`
  display: inline;
  padding: 0;
  margin: 0;
`

const separate = (separator: string, array: JSX.Element[]) =>
  array.reduce((acc, v) => [...acc, separator, v], [] as ReactNode[])

interface Props {
  tags: string[]
}

export default function Tags({ tags }: Props) {
  return (
    <ul css={listStyle}>
      {separate(' ', tags.map((tag) =>
        <li key={tag} css={itemStyle}>
          <Link href={`/tags/${tag}/`} color="textSecondary" underline="hover">
            {`#${tag}`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
