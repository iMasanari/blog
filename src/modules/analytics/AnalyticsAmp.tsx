import { useAmp } from 'next/amp'

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export default function AnalyticsAmp() {
  const isAmp = useAmp()

  if (!GOOGLE_ANALYTICS_ID || !isAmp) {
    return null
  }

  const AmpAnalyticsTag = 'amp-analytics' as any

  const data = {
    vars: {
      gtag_id: GOOGLE_ANALYTICS_ID,
      config: {
        [GOOGLE_ANALYTICS_ID]: { 'groups': 'default' },
      },
    },
  }

  return (
    <AmpAnalyticsTag type="gtag" data-credentials="include">
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </AmpAnalyticsTag>
  )
}
