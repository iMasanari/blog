// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import molcss from 'molcss/vite-plugin'
import { remarkCodeWrapper } from './scripts/remark-plugin'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.imasanari.dev',
  integrations: [
    mdx({
      remarkRehype: {
        footnoteLabelTagName: 'hr',
        footnoteLabel: ' ',
        footnoteBackLabel: () => /** @type {any}*/(null),
        footnoteLabelProperties: {},
      },
      remarkPlugins: [remarkCodeWrapper],
      shikiConfig: {
        theme: 'github-light',
      },
    }),
    icon({
      iconDir: 'src/assets/svg',
    }),
    sitemap(),
  ],
  vite: {
    plugins: [
      molcss({
        content: 'src/**/*.{js,jsx,ts,tsx,astro}',
      }),
    ],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  compressHTML: true,
})
