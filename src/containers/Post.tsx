import { h } from 'hyperapp'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import PostPager from '../components/PostPager'
import { Actions, State } from '..'
// import 'prismjs/themes/prism.css'

interface Props {
  post: Post
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
}

export default ({ post, prev, next }: Props) =>
  (_state: State, actions: Actions) =>
    <div>
      <article>
        <span>{post.date}</span>
        <h1>{post.title}</h1>
        <PostTags tags={post.tags} />
        <div
          innerHTML={post.contents}
          oncreate={(el: Element) => { el.innerHTML = post.contents }}
          onclick={(e: Event) => {
            const el = e.target as HTMLElement

            if (el.tagName.toLowerCase() === 'a') {
              actions.linkHandler(e)
            }
          }}
        />
      </article>
      <PostPager prev={prev} next={next} />
    </div>
