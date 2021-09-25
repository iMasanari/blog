import React, { ReactNode } from 'react'
import Link from '../atoms/Link'

interface Props {
  href: string
  children: NonNullable<ReactNode>
}

export default function NavItem({ href, children }: Props) {
  return (
    <Link href={href} ml={3} color="inherit" variant="body1" noWrap>
      {children}
    </Link>
  )
}
