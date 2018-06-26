import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'
import convert from 'htmr'

interface Props {
  about: Post
}

export default withRouteData(({ about }: Props) => (
  <div>
    {convert(about.contents)}
  </div>
))
