// @ts-check

const { rollup } = require('rollup')
const rollupAlias = require('rollup-plugin-alias')

const { app, h } = require('hyperapp')
const { withRender } = require('@hyperapp/render')
const { minify } = require('html-minifier')

const requireWithRollup = require('./requireWithRollup')
const createSiteRoutes = require('./createSiteRoute')
const createFile = require('./createFile')

const crypto = require('crypto')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const unwarpFn = (config, arg) =>
  typeof config === 'function' ? config(arg) : config

const render = withRender(app)

const main = async () => {
  const config = await unwarpFn(await requireWithRollup('./rollup.config.js'))
  const routes = await unwarpFn(await requireWithRollup('./routes.ts', config), {})

  const components = Array.from(new Set(routes.map((route) => route.component)))

  const componentMapping = await createSiteRoutes(components)

  config.plugins = [
    rollupAlias({ 'site-route': path.join(process.cwd(), 'dist', 'site-route.js') }),
    ...config.plugins || [],
  ]


  // jsのビルド

  const bundle = await rollup({
    ...config,
    input: 'src/index.tsx',
  })

  const { code } = await bundle.generate({ format: 'iife' })

  const hash = crypto.createHash('sha512').update(code).digest('hex')
  const outputFileBaseNameNoExt = `bundle.${hash.slice(0, 10)}`

  bundle.write({
    file: `./dist/${outputFileBaseNameNoExt}.js`,
    format: 'iife',
  })


  // htmlのビルド

  const Template = await requireWithRollup('./src/Template.tsx', config)

  routes.forEach((route) => {
    const props = unwarpFn(route.data) || {}
    const meta = unwarpFn(route.meta) || {}

    const data = {
      component: componentMapping[route.component],
      title: route.title,
      props: props,
    }

    createFile(`dist${route.path}/index.json`, JSON.stringify(data, null, isProduction ? null : 2))

    const state = {
      location: {
        pathname: route.path,
        previous: '/',
      },
      data,
    }

    const code = render(state, {}, () => h(Template, {
      script: `/${outputFileBaseNameNoExt}.js`,
      css: `/${outputFileBaseNameNoExt}.css`,
      meta,
    })).toString()

    const html = isProduction ? minify(code, {
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      sortAttributes: true,
      sortClassName: true,
    }) : code

    createFile(`dist${route.path}/index.html`, `<!DOCTYPE html>${html}`)
  })
}

main().catch((e) => {
  setImmediate(() => { throw e })
})
