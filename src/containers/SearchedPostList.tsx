import React from 'react'
import { withRouteData, Link, Head } from 'react-static'
import Posts from '../components/Posts'
import { title } from '../constants'
import { Post } from '../types'

interface Props {
  posts: Post[]
  tag: string
}

export default withRouteData(
  ({ posts, tag }: Props) =>
    <div>
      <Head>
        <title>「{tag}」タグの一覧 - {title}</title>
      </Head>
      <div>
        <Link to="/">TOP</Link>
        {' > '}
        <span>{tag}</span>
      </div>
      <p>「{tag}」の検索結果</p>
      <Posts posts={posts} />
    </div>
)
