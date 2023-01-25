import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { SITE_NAME, SITE_ROOT } from '~/constants'

interface Props {
  title?: string;
  description: string;
  image?: string;
}

export default function Head({ title, description, image }: Props) {
  const router = useRouter()

  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const isArticle = router.pathname.startsWith('/posts/')
  const url = `${SITE_ROOT}${router.asPath}`

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_ROOT}${image || '/images/icon.jpg'}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary" />
      <link rel="canonical" href={url} />
    </NextHead>
  )
}
