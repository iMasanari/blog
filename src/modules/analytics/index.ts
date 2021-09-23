import { useRouter } from 'next/router'
import { useEffect } from 'react'

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID) {
      return
    }

    const handleRouteChange = (path: string) => {
      gtag('config', GOOGLE_ANALYTICS_ID, { page_path: path })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
