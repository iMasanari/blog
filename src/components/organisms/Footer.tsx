import { Container, Link, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing(4, 0),
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Container>
        <Typography gutterBottom>
          Author: <Link href="https://github.com/iMasanari">iMasanari</Link>
        </Typography>
        <Link variant="body2" href="https://github.com/iMasanari/imasanari.github.io/">
          {'Show on GitHub'}
        </Link>
      </Container>
    </footer>
  )
}
