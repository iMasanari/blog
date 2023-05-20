import { visitParents } from 'unist-util-visit-parents'

const getTitle = (langValue) => {
  if (!langValue) return [null, langValue]

  const index = langValue.indexOf(':')

  if (!~index) return [null, langValue]

  return [
    langValue.slice(index + 1),
    langValue.slice(0, index),
  ]
}

export const remarkCodeWrapper = () => {
  return (tree) => visitParents(tree, 'code', (node, parents) => {
    const parent = parents[parents.length - 1]
    const children = parent.children
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

    children.splice(index, 1, wrapNode)
  })
}
