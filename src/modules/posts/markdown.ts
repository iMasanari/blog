import remarkShiki from '@stefanprobst/remark-shiki'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import * as shiki from 'shiki'
import { Processor, unified } from 'unified'
import remarkCodeWrapper from './remark-code-wrapper'

let processorPromise: Promise<Processor>

const createProsessor = async () => {
  const highlighter = await shiki.getHighlighter({ theme: 'dark-plus' })

  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCodeWrapper)
    .use(remarkShiki, { highlighter })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
}

export const toHTML = async (text: string) => {
  if (!processorPromise) {
    processorPromise = createProsessor()
  }

  const processor = await processorPromise
  const result = await processor.process(text)

  return result.toString()
}
