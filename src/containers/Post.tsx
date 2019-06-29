import { h } from 'hyperapp'
import { Post } from '../types'
import PostTags from '../components/PostTags'
import PostPager from '../components/PostPager'
import { Actions } from '~/modules/actions'
import { State } from '~/modules/state'
import AsidePosts from '../components/AsidePosts'
import linkObserver from '../routing/linkObserver'
import './Post.css'

interface Props {
  post: Post
  prev?: Pick<Post, 'title' | 'slug'>
  next?: Pick<Post, 'title' | 'slug'>
  sameTags: Post[]
}

const updateHundler = (el: HTMLElement) => {
  const list = el.querySelectorAll('a')

  for (let i = 0, len = list.length; i < len; ++i) {
    linkObserver(list[i])
  }
}

export default ({ post, prev, next, sameTags }: Props) =>
  (_state: State, actions: Actions) =>
    <div>
      <article class="nes-container shared-main-container">
        <div class="Post-header">
          <span>{post.date}</span>
          <h1>{post.title}</h1>
          <PostTags tags={post.tags} />
        </div>
        <div
          innerHTML={post.contents}
          oncreate={(el: HTMLElement) => {
            el.innerHTML = post.contents
            updateHundler(el)
          }}
          onupdate={updateHundler}
          onclick={(e: MouseEvent) => {
            const el = e.target as HTMLElement

            if (el.tagName.toLowerCase() === 'a') {
              actions.linkHandler(e)
            }
          }}
        />
      </article>
      <PostPager prev={prev} next={next} />
      {sameTags.length > 0 &&
        <AsidePosts tags={post.tags} posts={sameTags} />
      }
    </div>
