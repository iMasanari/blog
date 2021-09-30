import { Typography } from '@mui/material'
import React from 'react'
import Link from '../atoms/Link'

interface Props {
  title: string
  description: string
  isHeading?: boolean
  className?: string
}

export default function SiteTitle({ title, description, isHeading, className }: Props) {
  return (
    <div className={className}>
      <Typography variant="h6" component={isHeading ? 'h1' : 'div'} noWrap>
        <Link href="/" color="inherit" underline="none">
          {title}
        </Link>
      </Typography>
      <Typography variant="body2" noWrap>
        {description}
      </Typography>
    </div>
  )
}
