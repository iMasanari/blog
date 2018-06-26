import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Post } from '../types'
import convert from 'htmr'

interface Props {
  post: Post
}

export default withRouteData(({ post }: Props) => (
  <div>
    <Link to="/">{'<'} Back</Link>
    <br />
    <h3>{post.title}</h3>
    {convert(post.contents)}
  </div>
))
