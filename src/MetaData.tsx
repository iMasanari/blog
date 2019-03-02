import { h } from 'hyperapp'
import { title as siteTitle, siteRoot, GA_TRACKING_ID } from './constants'
import { State } from '.'

interface Props {
  path?: string
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

const Fragment = (_props: {}, children: any) =>
  children

export default (props: Props) => (state: State) => {
  const title = state.data.title || siteTitle
  const description = props.meta.description || title

  return (
    <Fragment>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script innerHTML={gtag} />

      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OGPタグ */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={state.data.title ? 'article' : 'blog'} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteRoot}${props.path}/`} />
      <meta property="og:image" content={`${siteRoot}${props.meta.image || '/images/icon.jpg'}`} />
      <meta name="twitter:card" content="summary" />
    </Fragment>
  )
}
