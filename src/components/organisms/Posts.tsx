import { makeStyles } from '@material-ui/core'
import PostHeader, { PostThumb } from '../molecules/PostHeader'

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
  posts: PostThumb[]
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
