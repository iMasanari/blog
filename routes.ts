import jdown from 'jdown'
import marked from 'marked'
import { minify } from 'html-minifier'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import { Post } from './src/types'
import { title } from './src/constants'

// 日付の整形
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const date_ = `0${date.getDate()}`.slice(-2)

  return `${year}-${month}-${date_}`
}

const renderer = new class extends marked.Renderer {
  options: any

  link(href: string, title: string, text: string) {
    const attrs = {
      href,
      title,
      target: href.startsWith('http') && '_blank',
      rel: href.startsWith('http') && 'noopener',
    }

    const attrsStr = (Object.keys(attrs) as (keyof typeof attrs)[])
      .filter(key => attrs[key])
      .map(key => `${key}="${attrs[key]}"`)
      .join(' ')

    return `<a ${attrsStr}>${text}</a>`
  }
  code(code: string, lang: string, _escaped: boolean) {
    var out = this.options.highlight(code, lang)
    var classMap = this.options.langPrefix + lang

    return lang
      ? `<pre class="${classMap}"><code class="${classMap}">${out}\n</code></pre>`
      : `<pre><code>${out}\n</code></pre>`
  }
}

export default async () => {
  const { posts }: { posts: Post[] } = await jdown('content', {
    breaks: true,
    renderer,
    langPrefix: 'language-',
    highlight: function (code: string, lang: string) {
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

    v.contents = minify(v.contents, {
      collapseBooleanAttributes: true,
      // collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      quoteCharacter: `'`,
      removeAttributeQuotes: true,
      removeComments: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true,
    })
  })

  const tags = Array.from(new Set(
    posts.reduce((acc, post) => [...acc, ...post.tags], [])
  ))

  const pagerRow = 5

  return [
    ...Array(Math.ceil(posts.length / pagerRow)).fill(null).map((_, i) => ({
      path: i ? `/p${i + 1}` : '',
      component: 'src/containers/PostList',
      title: title,
      data: {
        posts: posts
          .slice(i * pagerRow, (i + 1) * pagerRow)
          .map(({ title, slug, date, tags }) => ({ title, slug, date, tags })),
        pager: {
          page: i + 1,
          max: Math.ceil(posts.length / pagerRow),
        },
      },
      meta: {
        description: 'iMasanariの技術ブログ',
      }
    })),
    // TODO: Redirect
    // { path: '/blog', redirect: '/' },
    ...posts.map((post, i) => {
      const prev = posts[i - 1]
      const next = posts[i + 1]

      return {
        path: `/blog/${post.slug}`,
        component: 'src/containers/Post',
        title: `${post.title} - ${title}`,
        data: {
          post,
          prev: prev && { title: prev.title, slug: prev.slug },
          next: next && { title: next.title, slug: next.slug },
        },
        meta: {
          description: post.description,
          image: post.image,
        }
      }
    }),
    // { path: '/tags', redirect: '/' },
    ...tags.map((tag) => ({
      path: `/tags/${tag}`,
      component: 'src/containers/SearchedPostList',
      title: `「${tag}」タグの一覧 - ${title}`,
      data: {
        posts: posts
          .filter(post => post.tags.includes(tag))
          .map(({ title, slug, date, tags }) => ({ title, slug, date, tags })),
        tag,
      },
    })),
    // { is404: true, component: 'src/containers/404' }
  ]
}
