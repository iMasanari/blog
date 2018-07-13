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

export default ({ post, prev, next }: Props) =>
  <div>
    <article>
      <span>{post.date}</span>
      <h1>{post.title}</h1>
      <PostTags tags={post.tags} />
      <div
        innerHTML={post.contents}
        oncreate={(el: Element) => {
          el.innerHTML = post.contents
          el.addEventListener('click', (e) => {
            const target = e.target

            if (target instanceof HTMLAnchorElement && !/$http/.test(target.href)) {
              e.preventDefault()
              history.pushState(location.pathname, '', target.href)
            }
          })
        }}
      />
    </article>
    <PostPager prev={prev} next={next} />
  </div>
