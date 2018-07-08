import './inject-window'

import jdown from 'jdown'
import marked from 'marked'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import { Post } from './src/types'

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
      rel: href.startsWith('http') && 'noopener noreferrer',
    }

    const attrsStr = (Object.keys(attrs) as (keyof typeof attrs)[])
      .filter(key => attrs[key])
      .map(key => `${key}=${attrs[key]}`)
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
  })

  const tags = Array.from(new Set(
    posts.reduce((acc, post) => [...acc, ...post.tags], [])
  ))

  return [
    {
      path: '/',
      component: 'src/containers/PostList',
      getData: () => ({
        posts: posts
          .map(({ title, slug, date, tags }) => ({ title, slug, date, tags })),
      }),
    },
    // TODO: Redirect
    // { path: '/blog', redirect: '/' },
    ...posts.map((post, i) => ({
      path: `/blog/${post.slug}`,
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
    // { path: '/tags', redirect: '/' },
    ...tags.map((tag) => ({
      path: `/tags/${tag}`,
      component: 'src/containers/SearchedPostList',
      getData: () => ({
        posts: posts
          .filter(post => post.tags.includes(tag))
          .map(({ title, slug, date, tags }) => ({ title, slug, date, tags })),
        tag,
      }),
    })),
    // { is404: true, component: 'src/containers/404' }
  ]
}
