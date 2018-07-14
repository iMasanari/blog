import { h } from 'hyperapp'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import PostPager from '../components/PostPager'
// import 'prismjs/themes/prism.css'

interface Props {
  post: Post
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

const clickHandler = (e: Event) => {
  if (e.target instanceof HTMLAnchorElement) {
    const href = e.target.getAttribute('href')

    if (!/^http/.test(href)) {
      e.preventDefault()
      history.pushState(location.pathname, '', href)
    }
  }
}

export default ({ post, prev, next }: Props) =>
  <div>
    <article>
      <span>{post.date}</span>
      <h1>{post.title}</h1>
      <PostTags tags={post.tags} />
      <div
        innerHTML={post.contents}
        oncreate={(el: Element) => { el.innerHTML = post.contents }}
        onclick={clickHandler}
      />
    </article>
    <PostPager prev={prev} next={next} />
  </div>
