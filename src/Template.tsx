import { h } from 'hyperapp'
import App from './App'
import { title, siteRoot } from './constants'
import { State } from '.';

interface Props {
  script?: string
  css?: string
  inlineData?: string
  meta: {
    description?: string
  }
}

export default (props: Props) => (state: State) =>
  <html lang="ja-JP">
    <head>
      {props.script ? <link rel="preload" href={props.script} as="script" /> : null}
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{state.data.props.title || title}</title>
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
      {props.inlineData ? <script innerHTML={`var __data = ${JSON.stringify(props.inlineData)}`} /> : null}
      {props.script ? <script src={props.script} /> : null}
    </body>
  </html>
