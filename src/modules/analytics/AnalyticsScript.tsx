import { useAmp } from 'next/amp'

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

const script = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ANALYTICS_ID || ''}', {
  page_path: window.location.pathname,
});
`

export default function AnalyticsScript() {
  const isAmp = useAmp()

  if (!GOOGLE_ANALYTICS_ID || isAmp) {
    return null
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      {GOOGLE_SITE_VERIFICATION
        ? <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
        : null
      }
    </>
  )
}
