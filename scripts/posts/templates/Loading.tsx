import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const Paragraph = () =>
  <Typography gutterBottom>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </Typography>

const Section = () =>
  <>
    <Typography variant="h4" gutterBottom>
      <Skeleton />
    </Typography>
    <Paragraph />
    <Paragraph />
    <Paragraph />
  </>

export default function Loading() {
  return (
    <div>
      <Paragraph />
      <Section />
      <Section />
      <Section />
      <Section />
    </div>
  )
}
