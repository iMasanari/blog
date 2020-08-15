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

export const Time = ({ dateTime }: Props) => {
  const date = useMemo(() => format(dateTime), [dateTime])

  return <time dateTime={dateTime}>{date}</time>
}
