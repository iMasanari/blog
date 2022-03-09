import type { Code, Root, Content } from 'mdast'
import { visitParents } from 'unist-util-visit-parents'

const getTitle = (langValue: string | null | undefined) => {
  if (!langValue) return [null, langValue]

  const index = langValue.indexOf(':')

  if (!~index) return [null, langValue]

  return [
    langValue.slice(index + 1),
    langValue.slice(0, index),
  ]
}

export default function remarkCodeWrapper() {
  return (tree: Root) => visitParents(tree, 'code', (node: Code, parents) => {
    const parent = parents[parents.length - 1]
    const children = parent.children as Content[]
    const index = children.indexOf(node)

    const [title, lang] = getTitle(node.lang)

    node.lang = lang

    const wrapNode = {
      type: 'h-element',
      children: [node],
      data: {
        hName: 'app-code-wrapper',
        hProperties: { title, lang, code: node.value },
      },
    }

    children.splice(index, 1, wrapNode as any)
  })
}
