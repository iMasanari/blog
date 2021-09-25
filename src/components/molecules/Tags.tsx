import makeStyles from '@mui/styles/makeStyles'
import React, { ReactNode } from 'react'
import Link from '../atoms/Link'

const useStyles = makeStyles(theme => ({
  list: {
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'inline',
    padding: 0,
    margin: 0,
  },
}))

const separate = (separator: string, array: JSX.Element[]) =>
  array.reduce((acc, v) => [...acc, separator, v], [] as ReactNode[])

interface Props {
  tags: string[]
}

export default function Tags({ tags }: Props) {
  const classes = useStyles()

  return (
    <ul className={classes.list}>
      {separate(' ', tags.map((tag) =>
        <li key={tag} className={classes.item}>
          <Link href={`/tags/${tag}/`} color="textSecondary">
            {`#${tag}`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
