const path = require('path')

module.exports = {
  trailingSlash: true,
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname, 'src')
    config.resolve.alias['@/contents'] = path.join(__dirname, 'contents')

    config.module.rules.push({
      test: /\.mdx?$/i,
      loader: [
        { loader: 'babel-loader', options: { 'presets': ['@babel/preset-react'] } },
        'mdx-loader',
      ],
    })

    return config
  },
}
