import { css, Theme } from '@emotion/react'
import { Box, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableProps, TableRow, Typography, TypographyProps } from '@mui/material'
import DomParserReact from 'dom-parser-react'
import { createDom } from 'dom-parser-react/server'
import Link from '../atoms/Link'
import PostHeader from '../molecules/PostHeader'
import { Post as IPost } from '~/types'

interface Props {
  post: IPost
  content: string
}

const codeStyle = (theme: Theme) => css`
  padding: ${theme.spacing(0.5, 1)};
  border-radius: ${theme.spacing(0.5)};
  background-color: #1e1e1e;
  color: #d4d4d4;
  pre > & {
    padding: 0;
  }
`

const breakAllStyle = css`
  word-break: break-all;
`

const codeBlockStyle = (theme: Theme) => css`
  font-family: monospace;
  overflow: auto;
  padding: ${theme.spacing(1, 4)};
`

const Code = (props: any) => {
  const breakAll =
    typeof props.children === 'string' && /^[a-zA-Z$_][a-zA-Z0-9$_.]*$/.test(props.children)

  return (
    <code {...props} css={[codeStyle, breakAll && breakAllStyle]} />
  )
}

const CodeBlock = (props: TypographyProps<'pre'>) =>
  <Typography
    component="pre"
    gutterBottom
    {...props}
    css={codeBlockStyle}
  />

const components = {
  p: (props: TypographyProps<'p'>) => <Typography {...props} gutterBottom />,
  h2: (props: TypographyProps<'h2'>) => <Typography mt={2} {...props} component="h2" variant="h4" gutterBottom />,
  h3: (props: TypographyProps<'h3'>) => <Typography mt={2} {...props} component="h3" variant="h5" gutterBottom />,
  h4: (props: TypographyProps<'h4'>) => <Typography mt={2} {...props} component="h4" variant="h6" gutterBottom />,
  // h5: (props: TypographyProps<'h5'>) => <Typography mt={2} {...props} component="h5" variant="h6" />,
  // h6: (props: TypographyProps<'h6'>) => <Typography mt={2} {...props} component="h6" variant="h6" />,
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
  return (
    <article>
      <Box mb={4}>
        <PostHeader post={post} />
      </Box>
      <main>
        <DomParserReact
          source={typeof window === 'object' ? content : createDom(content)}
          components={components}
        />
      </main>
    </article>
  )
}
