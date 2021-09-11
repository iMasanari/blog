import { makeStyles, Typography } from '@material-ui/core'
import Tags from '../molecules/Tags'
import Posts from './Posts'
import { Post } from '~/types'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4, 'auto'),
  },
}))

interface Props {
  tags: string[]
  posts: Post[]
}

export default function AsidePosts({ tags, posts }: Props) {
  const classes = useStyles()

  return (
    <aside className={classes.root}>
      <header>
        <Typography variant="h5" component="h1">同じタグを含む記事</Typography>
        <Tags tags={tags} />
      </header>
      <main>
        <Posts posts={posts} />
      </main>
    </aside>
  )
}
