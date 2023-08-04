// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import molcss from 'molcss/vite-plugin'
import { remarkCodeWrapper } from './scripts/remark-plugin'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.imasanari.dev',
  integrations: [
    mdx({
      remarkPlugins: [remarkCodeWrapper],
      shikiConfig: {
        theme: 'github-light',
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [
      /** @type {any} */(
        molcss({
          content: 'src/**/*.{astro,ts}',
          include: /\.(astro|ts)$/,
        })
      ),
    ],
  },
  compressHTML: true,
})
