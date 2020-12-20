import { makeStyles, Typography } from '@material-ui/core'
import { PostThumb } from '../molecules/PostHeader'
import Tags from '../molecules/Tags'
import Posts from './Posts'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4, 'auto'),
  },
}))

interface Props {
  tags: string[]
  posts: PostThumb[]
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
