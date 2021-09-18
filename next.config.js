module.exports = {
  trailingSlash: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/i,
      use: 'raw-loader',
    })

    return config
  },
}
