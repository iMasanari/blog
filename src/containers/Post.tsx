import { h } from 'hyperapp'
import page from 'page'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import PostPager from '../components/PostPager'
import smoothScroll from '../util/smoothScroll'
// import 'prismjs/themes/prism.css'

interface Props {
  post: Post
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

const clickHandler = (e: Event) => {
  const el = e.target as HTMLElement
  
  if (el.tagName.toLowerCase() === 'a' && !/^http/.test(el.getAttribute('href'))) {
    e.preventDefault()
    page((el as HTMLAnchorElement).href)
    smoothScroll()
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
