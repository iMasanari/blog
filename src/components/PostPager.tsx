import React from 'react'
import { Link } from 'react-static'
import { blogUrl } from '../constants'
import { Post } from '../types'
import './PostPager.css'

interface Props {
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

export default ({ prev, next }: Props) =>
  <div className="PostPager">
    <div className="PostPager-item">
      {prev ? <Link to={`${blogUrl}/${prev.slug}`}>{prev.title}</Link> : null}
    </div>
    <div className="PostPager-item">
      <Link to="/">HOME</Link>
    </div>
    <div className="PostPager-item">
      {next ? <Link to={`${blogUrl}/${next.slug}`}>{next.title}</Link> : null}
    </div>
  </div>