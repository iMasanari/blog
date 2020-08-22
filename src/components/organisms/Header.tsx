import { useRouter } from 'next/router'
import { SiteTitle } from '../molecules/SiteTitle'

interface Props {
  title: string
  description: string;
}

export const Header = ({ title, description }: Props) => {
  const router = useRouter()
  const isRoot = router.pathname === '/'

  return (
    <header>
      <SiteTitle label={title} isRoot={isRoot} />
      <p>{description}</p>
    </header>
  )
}
