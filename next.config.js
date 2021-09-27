// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  webpack(/** @type {import('webpack').Configuration} */ config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/core': '@mui/core/legacy',
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
