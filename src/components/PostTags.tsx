import React from 'react'
import { Link } from 'react-static'

interface Props {
  tags: string[]
}

export default ({ tags }: Props) =>
  <ul className="PostTags">
    {tags.map((tag) =>
      <li key={tag} className="PostTags-li">
        <Link className="PostTags-Link" to={`/tags/${tag}`}>{tag}</Link>
        {' '}
      </li>
    )}
  </ul>
