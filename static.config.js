import React from 'react'
import axios from 'axios'
import path from 'path'
import { reloadRoutes } from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

chokidar.watch('content').on('all', () => reloadRoutes())


export default {
  preact: true,
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    /** @type {{about: any, posts: any[]}} */
    const { about, posts } = await jdown('content')

    return [{
      path: '/',
      component: 'src/containers/Posts',
      getData: () => ({ posts }),
    }, {
      path: '/about',
      component: 'src/containers/About',
      getData: () => ({ about }),
    }, {
      path: '/blog',
      redirect: '/',
      children: posts.map((post) => ({
        path: `/${post.slug}`,
        component: 'src/containers/Post',
        getData: () => ({ post }),
      })),
    }, {
      is404: true,
      component: 'src/containers/404',
    }]
  },
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="ja-JP">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  webpack: (config, { defaultLoaders }) => {
    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    config.module.rules[0].oneOf.unshift({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
      use: [
        { loader: 'babel-loader' },
        {
          loader: require.resolve('ts-loader'),
          options: { transpileOnly: true },
        },
      ],
    })

    return config
  },
}
