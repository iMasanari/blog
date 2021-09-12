// @ts-check

const { readFileSync, readdirSync, mkdirSync, writeFileSync } = require('fs')
const { join, extname, relative, dirname } = require('path')
const matter = require('gray-matter')

const targetPath = join(process.cwd(), 'generated/posts.js')
const postsPath = join(process.cwd(), 'contents/posts')

const listFiles = (dir, ext) =>
  readdirSync(dir, { withFileTypes: true }).flatMap(dirent => {
    const path = `${dir}/${dirent.name}`

    if (!dirent.isFile()) {
      return listFiles(path, ext)
    }

    return extname(dirent.name) === ext ? [path] : []
  })

const list = listFiles(postsPath, '.md').map(path => {
  const content = readFileSync(path, 'utf-8')
  const { slug } = matter(content).data

  return { path, slug }
})

const stringifiedFileContent = `import dynamic from 'next/dynamic'
import loading from '${relative(dirname(targetPath), join(__dirname, 'templates','Loading'))}'

export const posts = {
${list.map(({ slug, path }) =>
  `  '${slug}': dynamic(() => import('${relative(dirname(targetPath), path)}'), { loading }),`
).join('\n')}
}
`

mkdirSync(dirname(targetPath), { recursive: true })
writeFileSync(targetPath, stringifiedFileContent)
