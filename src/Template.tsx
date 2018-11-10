import { h } from 'hyperapp'
import App from './App'
import { title as siteTitle, siteRoot, GA_TRACKING_ID } from './constants'
import { State } from '.';

interface Props {
  path?: string
  script?: string
  css?: string
  meta: {
    description?: string
    image?: string
  }
}

const gtag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', ${JSON.stringify(GA_TRACKING_ID)});
`

const If = (props: { test: any }, children: any) =>
  props.test ? children : null

export default (props: Props) => (state: State) => {
  const isProduction = process.env.NODE_ENV === 'production'

  const title = state.data.title || siteTitle
  const description = props.meta.description || title

  return (
    <html lang="ja-JP" prefix="og: http://ogp.me/ns#">
      <head>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <If test={isProduction}>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        </If>
        <script innerHTML={gtag} />

        <If test={props.script}>
          <link rel="preload" href={props.script} as="script" />
        </If>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        <If test={props.css}>
          <link rel="stylesheet" href={props.css} />
        </If>

        <meta name="description" content={description} />
        {/* OGPタグ */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content={state.data.title ? 'article' : 'blog'} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteRoot}${props.path}/`} />
        <meta property="og:image" content={`${siteRoot}${props.meta.image || '/images/icon.jpg'}`} />
        <meta name="twitter:card" content="summary" />
      </head>
      <body>
        <App />

        <If test={state.data}>
          <script innerHTML={`\nvar __data = ${JSON.stringify(state.data, null, 2)};\n`} />
        </If>
        <If test={props.script}>
          <script src={props.script} />
        </If>
      </body>
    </html>
  )
}
