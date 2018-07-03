import React from 'react'
import path from 'path'
import { reloadRoutes } from 'react-static/node'
import jdown from 'jdown'
import marked from 'marked'
import hljs from 'highlight.js'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import chokidar from 'chokidar'

// 日付の整形
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const date_ = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${date_}`
}

// markdownの変更を検知し、更新する
chokidar.watch('content').on('all', () => reloadRoutes())

const renderer = new class extends marked.Renderer {
  code(code, lang, escaped) {
    var out = this.options.highlight(code, lang)
    var classMap = this.options.langPrefix + lang

    return lang
      ? `<pre class="${classMap}"><code class="${classMap}">${out}\n</code></pre>`
      : `<pre><code>${out}\n</code></pre>`
  }
}

export default {
  preact: true,
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    /** @type {{about: any, posts: any[]}} */
    const { about, posts } = await jdown('content', {
      breaks: true,
      renderer,
      langPrefix: 'language-',
      highlight: function (code, lang) {
        const language = !lang || lang === 'html' ? 'markup' : lang;

        if (!Prism.languages[language]) {
          loadLanguages([language])
        }

        return Prism.languages[language]
          ? Prism.highlight(code, Prism.languages[language]) : code;
      }
    })

    posts.sort((a, b) => a.date < b.date ? 1 : -1)

    posts.forEach(v => {
      v.date = formatDate(new Date(v.date))
    })

    const tags = Array.from(new Set(
      posts.reduce((acc, post) => [...acc, ...post.tags], [])
    ))

    return [{
      path: '/',
      component: 'src/containers/PostList',
      getData: () => ({
        posts: posts.map(({ contents, ...post }) => post),
      }),
    }, {
      path: '/about',
      component: 'src/containers/About',
      getData: () => ({ about }),
    }, {
      path: '/blog',
      redirect: '/',
      children: posts.map((post, i) => ({
        path: `/${post.slug}`,
        component: 'src/containers/Post',
        getData: () => {
          const prev = posts[i - 1]
          const next = posts[i + 1]

          return {
            post,
            prev: prev && { title: prev.title, slug: prev.slug },
            next: next && { title: next.title, slug: next.slug },
          }
        },
      })),
    }, {
      path: '/tags',
      redirect: '/',
      children: tags.map((tag) => ({
        path: `/${tag}`,
        component: 'src/containers/SearchedPostList',
        getData: () => ({
          posts: posts.filter(post => post.tags.includes(tag)).map(({ contents, ...post }) => post),
          tag,
        }),
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
