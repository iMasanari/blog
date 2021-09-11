import { Typography } from '@material-ui/core'
import { useMemo } from 'react'

interface Props {
  dateTime: string
}

const format = (time: string) => {
  const dateObj = new Date(time)

  const year = dateObj.getFullYear()
  const month = `0${dateObj.getMonth() + 1}`.slice(-2)
  const date = `0${dateObj.getDate()}`.slice(-2)

  return `${year}-${month}-${date}`
}

export default function Time({ dateTime }: Props) {
  const date = useMemo(() => format(dateTime), [dateTime])

  return (
    <Typography component="time" variant="body2" dateTime={dateTime}>
      {date}
    </Typography>
  )
}
