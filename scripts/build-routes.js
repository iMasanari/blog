// @ts-check

import { join } from 'path'
import { readFileSync } from 'fs'
import routesConfig from '../routes'
import createFile from './createFile'

const unwarpFn = (config, arg) =>
  typeof config === 'function' ? config(arg) : config

const main = async () => {
  const routes = await routesConfig()
  const components = Array.from(new Set(routes.map((route) => route.component)))

  const imports = []
  const names = []
  const mapping = {}

  components.forEach((component, i) => {
    const name = `$${i + ('_' + component).replace(/[^a-zA-Z0-9]+/g, '_')}`

    imports.push(`import ${name} from "${join('../', component)}";`)
    names.push(`  ${name}`)
    mapping[component] = i
  })

  const Route = readFileSync('./scripts/Route.js', 'utf-8')

  createFile(
    'build-cache/site-route.js',
    `${imports.join('\n')}\n\nvar routes = [\n${names.join(',\n')}\n];\n\n${Route}`
  )

  const routesObject = routes.reduce((acc, route) => ({
    ...acc,
    [route.path]: {
      data: {
        component: mapping[route.component],
        title: route.title,
        props: unwarpFn(route.data) || {},
      },
      meta: unwarpFn(route.meta) || {},
    }
  }), {})

  createFile(
    'build-cache/sitemap.json',
    JSON.stringify(routesObject, null, 2)
  )

  for (const route of routes) {
    const data = routesObject[route.path].data

    createFile(`./dist${route.path}/index.json`, JSON.stringify(data))
  }
}

main()
