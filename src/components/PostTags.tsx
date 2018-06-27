import React from 'react'
import { Link } from 'react-static'

interface Props {
  tags: string[]
}

export default ({ tags }: Props) =>
  <ul>
    {tags.map((tag) =>
      [<Link key={tag} to={`/tags/${tag}`}>{tag}</Link>, ' ']
    )}
  </ul>