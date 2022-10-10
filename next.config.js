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
    // for IE
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/base': '@mui/base/legacy',
      '@mui/material': '@mui/material/legacy',
      '@mui/private-theming': '@mui/private-theming/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
      '@mui/utils': '@mui/utils/legacy',
    }

    config.module.rules.push({
      test: /\.mdx?$/i,
      use: 'raw-loader',
    })

    return config
  },
}

module.exports = withBundleAnalyzer(withPreact(nextConfig))
