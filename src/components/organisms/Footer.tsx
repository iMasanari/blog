import { css, Theme } from '@emotion/react'
import { Container, Link, Typography } from '@mui/material'

const footerStyle = (theme: Theme) => css`
  text-align: center;
  margin: ${theme.spacing(4, 0)};
`

export default function Footer() {
  return (
    <footer css={footerStyle}>
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
