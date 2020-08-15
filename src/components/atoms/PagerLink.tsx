import Link from 'next/link'

interface Props {
  label: number
  active: boolean
  basePath?: string
  basePathAs?: string
}

export const PagerLink = ({ label, active, basePath, basePathAs }: Props) =>
  active
    ? <span>{label}</span>
    : (
      <Link
        href={label === 1 ? basePath || '/' : `${basePath || ''}/[page]`}
        as={label === 1 ? basePathAs || '/' : `${basePathAs || ''}/p${label}`}
      >
        <a>{label}</a>
      </Link>
    )
