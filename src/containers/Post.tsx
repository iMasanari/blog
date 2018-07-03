import React from 'react'
import { withRouteData, Head } from 'react-static'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import { title } from '../constants'
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
