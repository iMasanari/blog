import { h } from 'hyperapp'
import App from './App'
import { title, siteRoot, GA_TRACKING_ID } from './constants'
import { State } from '.';

interface Props {
  script?: string
  css?: string
  meta: {
    description?: string
  }
}

const gtag = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());

gtag('config',${JSON.stringify(GA_TRACKING_ID)});
`.replace(/\n/g, '')

export default (props: Props) => (state: State) =>
  <html lang="ja-JP">
    <head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      {process.env.NODE_ENV === 'production' ? <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} /> : null}
      <script innerHTML={gtag} />

      {props.script ? <link rel="preload" href={props.script} as="script" /> : null}
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{state.data.title || title}</title>
      {props.css ? <link rel="stylesheet" href={props.css} /> : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content={state.data.props.title || title} />
      <meta property="og:description" content={props.meta.description || state.data.props.title || title} />
      <meta property="og:url" content={siteRoot + state.location.pathname} />
      <meta property="og:image" content={`${siteRoot}/images/icon.jpg`} />
    </head>
    <body>
      <App />
      {state.data ? <script innerHTML={`var __data = ${JSON.stringify(state.data)}`} /> : null}
      {props.script ? <script src={props.script} /> : null}
    </body>
  </html>
