import PostHeader from '../molecules/PostHeader'
import { Post as IPost } from '~/types'

interface Props {
  post: IPost
}

export default function Post({ post }: Props) {
  return (
    <article>
      <PostHeader post={post} />
      <main>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </main>
    </article>
  )
}
