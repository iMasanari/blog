import React from 'react'
import { withRouteData } from 'react-static'
import { Post } from '../types'

interface Props {
  about: Post
}

export default withRouteData(({ about }: Props) => (
  <div dangerouslySetInnerHTML={{ __html: about.contents }} />
))
