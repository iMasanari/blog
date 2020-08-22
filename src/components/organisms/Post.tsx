import { Post as IPost } from '~/types'
import { PostHeader } from '../molecules/PostHeader'

interface Props {
  post: IPost
}

export const Post = ({ post }: Props) =>
  <article>
    <PostHeader post={post} />
    <main>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </main>
  </article>
