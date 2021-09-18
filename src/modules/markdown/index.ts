import rehypeShiki from '@leafac/rehype-shiki'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import * as shiki from 'shiki'
import { unified } from 'unified'

export const parse = async (markdown: string) => {
  const highlighter = await shiki.getHighlighter({ theme: 'dark-plus' })

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki as any, { highlighter })
    .use(rehypeStringify)

  const result = await processor.process(markdown)

  return result.toString()
}
