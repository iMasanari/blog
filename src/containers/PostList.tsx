import React from 'react'
import { withRouteData, Head } from 'react-static'
import Posts from '../components/Posts'
import { title, siteRoot } from '../constants'
import { PostThumb } from '../components/PostThumb'

interface Props {
  posts:  PostThumb[]
  tag?: string
}

export default withRouteData(
  ({ posts }: Props) =>
    <div>
      <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="iMasanariの技術ブログ" />
        <meta property="og:url" content={siteRoot} />
        <meta property="og:image" content={`${siteRoot}/images/icon.jpg`} />
      </Head>
      <Posts posts={posts} />
    </div>
)
