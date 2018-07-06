import React from 'react'
import { withRouteData, Head } from 'react-static'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import { title, blogUrl, siteRoot } from '../constants'
import PostPager from '../components/PostPager'
import 'prismjs/themes/prism.css'

interface Props {
  post: Post
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

export default withRouteData(
  ({ post, prev, next }: Props) =>
    <React.Fragment>
      <Head>
        <title>{post.title} - {title}</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content={`${post.title} - ${title}`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`${siteRoot}${blogUrl}${post.slug}`} />
        <meta property="og:image" content={`${siteRoot}/images/icon.jpg`} />
      </Head>
      <article>
        <span>{post.date}</span>
        <h1>{post.title}</h1>
        <PostTags tags={post.tags} />
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
      </article>
      <PostPager prev={prev} next={next} />
    </React.Fragment>
)
