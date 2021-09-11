import NextLink from 'next/link'
import React, { AnchorHTMLAttributes, forwardRef } from 'react'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  as?: string
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  prefetch?: boolean
  locale?: string | false
}

export default forwardRef<HTMLAnchorElement, Props>(function LinkBehavior(
  { href, as, replace, scroll, shallow, prefetch, locale, ...props },
  ref
) {
  if (href[0] !== ('/')) {
    return <a href={href} target="_blank" rel="noopener" {...props} ref={ref} />
  }

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <a {...props} ref={ref} />
    </NextLink>
  )
})