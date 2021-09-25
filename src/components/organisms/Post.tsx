import { makeStyles, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableProps, TableRow, Typography, TypographyProps } from '@material-ui/core'
import clsx from 'clsx'
import DomParserReact from 'dom-parser-react'
import { createDom } from 'dom-parser-react/server'
import { ElementType } from 'react'
import Link from '../atoms/Link'
import PostHeader from '../molecules/PostHeader'
import { Post as IPost } from '~/types'

interface Props {
  post: IPost
  content: string
}

const useStyle = makeStyles((theme) => ({
  p: {
    marginTop: theme.spacing(2),
  },
  code: {
    '&:not(pre > &)': {
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.spacing(0.5),
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
    },
  },
  breakAll: {
    wordBreak: 'break-all',
  },
  pre: {
    fontFamily: 'monospace',
    overflow: 'auto',
    padding: theme.spacing(1, 4),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
}))

const Title = <T extends ElementType>(props: TypographyProps<T>) => {
  const classes = useStyle()

  return (
    <Typography
      {...props}
      className={clsx(classes.p, props.className)}
    />
  )
}

const Code = (props: React.HTMLProps<HTMLDetailsElement>) => {
  const classes = useStyle()

  const breakAll =
    typeof props.children === 'string' &&
    /^[a-zA-Z$_][a-zA-Z0-9$_.]*$/.test(props.children)

  return (
    <code
      {...props}
      className={clsx(classes.code, breakAll && classes.breakAll, props.className)}
    />
  )
}

const CodeBlock = (props: TypographyProps<'pre'>) => {
  const classes = useStyle()

  return (
    <Typography
      component="pre"
      gutterBottom
      {...props}
      className={clsx(classes.pre, props.className)}
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
  code: Code,
  pre: CodeBlock,
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

export default function Post({ post, content }: Props) {
  const classes = useStyle()

  return (
    <article>
      <div className={classes.header}>
        <PostHeader post={post} />
      </div>
      <main>
        <DomParserReact
          source={typeof window === 'object' ? content : createDom(content)}
          components={components}
        />
      </main>
    </article>
  )
}
