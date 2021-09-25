import makeStyles from '@mui/styles/makeStyles'
import React, { ReactNode } from 'react'
import Link from '../atoms/Link'

interface Props {
  href: string
  children: NonNullable<ReactNode>
}

const useStyles = makeStyles(theme => ({
  link: {
    marginLeft: theme.spacing(3),
  },
}))

export default function NavItem({ href, children }: Props) {
  const classes = useStyles()

  return (
    <Link href={href} className={classes.link} color="inherit" variant="body1" noWrap>
      {children}
    </Link>
  )
}
