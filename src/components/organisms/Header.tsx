import { useRouter } from 'next/router'
import css from 'styled-jsx/css'
import { SiteTitle } from '../molecules/SiteTitle'

interface Props {
  title: string
  description: string;
}

export const Header = ({ title, description }: Props) => {
  const router = useRouter()
  const isRoot = router.pathname === '/'

  return (
    <header className="Header">
      <SiteTitle label={title} isRoot={isRoot} />
      <p>{description}</p>
      <style jsx>{styles}</style>
    </header>
  )
}

const styles = css`
.Header {
  /* amp時 */
  padding-top: 0;
}
`
