import { PostThumb } from '../molecules/PostHeader'
import { Tags } from '../molecules/Tags'
import { Posts } from './Posts'

interface Props {
  tags: string[]
  posts: PostThumb[]
}

export const AsidePosts = ({ tags, posts }: Props) =>
  <aside>
    <header>
      <h1>同じタグを含む記事</h1>
      <Tags tags={tags} />
    </header>
    <main>
      <Posts posts={posts} />
    </main>
  </aside>
