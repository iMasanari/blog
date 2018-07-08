// @ts-check

const path = require('path')
const fs = require('fs')
const createFile = require('./createFile')

module.exports = async (components) => {
  let imports = ''
  let names = []
  let mapping = {}

  components.forEach((component, i) => {
    const name = `$${i + ('_' + component).replace(/[^a-zA-Z0-9]+/g, '_')}`

    imports += `import ${name} from "${path.join('../', component)}";\n`
    names.push(`  ${name}`)
    mapping[component] = i

  })

  const Route = fs.readFileSync('./scripts/Route.js', 'utf-8')

  await createFile(
    'dist/site-route.js',
    `${imports}\nvar routes = [\n${names.join(',\n')}\n];\n\n${Route}`
  )

  return mapping
}
