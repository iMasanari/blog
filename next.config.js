// @ts-check

const bundleAnalyzer = require('@next/bundle-analyzer')
const withPreact = require('next-plugin-preact')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compiler: {
    emotion: true,
  },
  webpack(/** @type {import('webpack').Configuration} */ config, options) {
    // @ts-expect-error
    config.module.rules.push({
      test: /\.mdx?$/i,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = withBundleAnalyzer(withPreact(nextConfig))
