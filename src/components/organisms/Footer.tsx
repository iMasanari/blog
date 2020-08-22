import css from 'styled-jsx/css'

export const Footer = () =>
  <footer className="Footer">
    <p>
      Author: <a href="https://github.com/iMasanari">iMasanari</a>
    </p>
    <small>
      <a href="https://github.com/iMasanari/imasanari.github.io/">
        {'Show on GitHub'}
      </a>
    </small>
    <style jsx>{styles}</style>
  </footer>

const styles = css`
.Footer {
  text-align: center;
}
`
