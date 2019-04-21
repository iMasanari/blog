// @ts-check

import { join } from 'path'
import { readFileSync } from 'fs'
import routesConfig from '../routes'
import createFile from './createFile'

const unwarpFn = <T>(config: T | (() => T)) =>
  typeof config === 'function' ? (config as () => T)() : config

const main = async () => {
  const routes = await routesConfig()
  const components = Array.from(new Set(routes.map((route) => route.component)))

  const imports = [] as string[]
  const names = [] as string[]
  const mapping = {} as Record<string, number>

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
    },
  }), {} as Record<string, { data: any, meta: any }>)

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
