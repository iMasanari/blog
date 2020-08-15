import css from 'styled-jsx/css'
import { range } from '~/utils/array'
import { PagerLink } from '../atoms/PagerLink'

export interface Pager {
  current: number
  max: number
}

interface Props {
  pager: Pager
  basePath?: string
  basePathAs?: string
}

export const Pager = ({ pager, basePath, basePathAs }: Props) =>
  <ul className="Pager">
    {range(pager.max).map((index) =>
      <li key={index} className="item">
        <PagerLink
          label={index + 1}
          active={index + 1 === pager.current}
          basePath={basePath}
          basePathAs={basePathAs}
        />
      </li>
    )}
    <style jsx>{styles}</style>
  </ul>

const styles = css`
.Pager {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
}

.item {
  margin-right: 1rem;
}

.item:last-child {
  margin-right: 0;
}
`
