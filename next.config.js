const path = require('path')

module.exports = {
  trailingSlash: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/i,
      use: [
        options.defaultLoaders.babel,
        'mdx-loader',
      ],
    })

    return config
  },
}
