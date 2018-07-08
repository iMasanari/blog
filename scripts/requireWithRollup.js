// @ts-check

const { rollup } = require('rollup')
const path = require('path')
const fs = require('fs')

const external = (id) => {
  if (id === 'site-route') return false

  return (id[0] !== '.' && !path.isAbsolute(id)) || id.slice(-5, id.length) === '.json'
}

module.exports = async (path, config) => {
  const fullPath = fs.realpathSync(path)

  const bundle = await rollup({
    ...config,
    input: fullPath,
    external,
  })

  const { code } = await bundle.generate({
    format: 'cjs'
  })

  const defaultLoader = require.extensions['.js']

  require.extensions['.js'] = (module, filename) => {
    if (filename === fullPath) {
      // @ts-ignore
      module._compile(code, filename)
    }
    else {
      defaultLoader(module, filename)
    }
  }

  // delete require.cache[fullPath]

  const result = require(fullPath)

  require.extensions['.js'] = defaultLoader

  return result
}
