import Link from 'next/link'
import css from 'styled-jsx/css'

interface Props {
  label: string
  isRoot: boolean
}

export const SiteTitle = ({ label, isRoot }: Props) => {
  const TitleTag = isRoot ? 'h1' : 'div'

  return (
    <TitleTag className="SiteTitle">
      <Link href="/">
        <a>{label}</a>
      </Link>
      <style jsx>{styles}</style>
    </TitleTag>
  )
}

const styles = css`
.SiteTitle {
  font-size: 2rem;
  margin: 1rem 0;
}
`
