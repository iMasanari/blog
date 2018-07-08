import { h } from 'hyperapp'
import Posts from '../components/Posts'
import { PostThumb } from '../components/PostThumb'

interface Props {
  posts: PostThumb[]
}

export default ({ posts }: Props) =>
  <div>
    {/* // TODO: ページごとのHeader対応
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="iMasanariの技術ブログ" />
      <meta property="og:url" content={siteRoot} />
      <meta property="og:image" content={`${siteRoot}/images/icon.jpg`} />
    </Head>
    */}
    <Posts posts={posts} />
  </div>
