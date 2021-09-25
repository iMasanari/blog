import makeStyles from '@mui/styles/makeStyles'
import PostHeader from '../molecules/PostHeader'
import { Post } from '~/types'

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    padding: theme.spacing(2, 3),
    margin: theme.spacing(2, 0),
    border: '1px solid #bbb',
  },
}))

interface Props {
  posts: Post[]
}

export default function Posts({ posts }: Props) {
  const classes = useStyles()

  return (
    <ul className={classes.list}>
      {posts.map((post) =>
        <li key={post.slug} className={classes.item}>
          <article>
            <PostHeader post={post} link />
          </article>
        </li>
      )}
    </ul>
  )
}
