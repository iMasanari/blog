import { h } from 'hyperapp'
import App from './App'
import { title } from './constants'

interface Props {
  script?: string
  css?: string
  inlineData?: string
}

export default (props: Props) =>
  <html lang="ja-JP">
    <head>
      {props.script ? <link rel="preload" href={props.script} as="script" /> : null}
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{title}</title>
      {props.css ? <link rel="stylesheet" href={props.css} /> : null}
    </head>
    <body>
      <App />
      {props.inlineData ? <script innerHTML={`var __data = ${JSON.stringify(props.inlineData)}`} /> : null}
      {props.script ? <script src={props.script} /> : null}
    </body>
  </html>
