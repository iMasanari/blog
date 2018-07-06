import React from 'react'
import { withRouteData, Link, Head } from 'react-static'
import Posts from '../components/Posts'
import { title, siteRoot } from '../constants'
import { PostThumb } from '../components/PostThumb'

interface Props {
  posts: PostThumb[]
  tag: string
}

export default withRouteData(
  ({ posts, tag }: Props) =>
    <div>
      <Head>
        <title>「{tag}」タグの一覧 - {title}</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content={`「${tag}」タグの一覧 - ${title}`} />
        <meta property="og:description" content={`「${tag}」タグの検索一覧`} />
        <meta property="og:url" content={siteRoot} />
        <meta property="og:image" content={`${siteRoot}/images/icon.jpg`} />
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
