import { makeStyles, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableProps, TableRow, Typography, TypographyProps, TypographyTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { MDXProvider } from '@mdx-js/react'
import clsx from 'clsx'
import { posts } from 'generated/posts'
import { useRouter } from 'next/router'
import Link from '../atoms/Link'
import PostHeader from '../molecules/PostHeader'
import { Post as IPost } from '~/types'

interface Props {
  post: IPost
}

const useStyle = makeStyles({
  '@keyframes fadein': {
    '0%': {
      transform: 'scale(0.99)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  p: {
    marginTop: '1em',
  },
  header: {
    marginBottom: '2em',
  },
  main: {
    animation: '$fadein 0.4s',
  },
})

const Title: OverridableComponent<TypographyTypeMap> = (
  props: TypographyProps
) => {
  const classes = useStyle()

  return (
    <Typography
      {...props}
      className={clsx(classes.p, props.className)}
    />
  )
}

const components = {
  p: (props: TypographyProps<'p'>) => <Typography {...props} gutterBottom />,
  h2: (props: TypographyProps<'h2'>) => <Title {...props} component="h2" variant="h4" gutterBottom />,
  h3: (props: TypographyProps<'h3'>) => <Title {...props} component="h3" variant="h5" gutterBottom />,
  h4: (props: TypographyProps<'h4'>) => <Title {...props} component="h4" variant="h6" gutterBottom />,
  // h5: (props: TypographyProps<'h5'>) => <Title {...props} component="h5" variant="h6" />,
  // h6: (props: TypographyProps<'h6'>) => <Title {...props} component="h6" variant="h6" />,
  ul: (props: TypographyProps<'ul'>) => <Typography {...props} component="ul" gutterBottom />,
  ol: (props: TypographyProps<'ol'>) => <Typography {...props} component="ol" gutterBottom />,
  li: (props: TypographyProps<'li'>) => <Typography {...props} component="li" />,
  a: Link,
  table: (props: TableProps) => (
    <TableContainer component={Paper} variant="outlined">
      <Table {...props} />
    </TableContainer>
  ),
  tbody: TableBody,
  tr: TableRow,
  th: (props: TableCellProps) => (
    <TableCell component="th" {...props} align={props.align || undefined} />
  ),
  td: (props: TableCellProps) => (
    <TableCell {...props} align={props.align || undefined} />
  ),
}

export default function Post({ post }: Props) {
  const classes = useStyle()
  const router = useRouter()
  const Contents = posts[post.slug]

  return (
    <article>
      <div className={classes.header}>
        <PostHeader post={post} />
      </div>
      <main key={router.asPath} className={classes.main}>
        <MDXProvider components={components}>
          <Contents />
        </MDXProvider>
      </main>
    </article>
  )
}
