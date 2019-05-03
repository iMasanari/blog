import { h, VNode } from 'hyperapp'
import linkObserver from './linkObserver'
import { Actions } from '~/modules/actions'
import { State } from '~/modules/state'

interface Props {
  [key: string]: any
  to: string
  location?: Location
}

export const Link = ({ to, ...props }: Props, childlen?: VNode) =>
  (_state: State, actions: Actions) =>
    <a
      {...props}
      href={to}
      onclick={actions.linkHandler}
      oncreate={linkObserver}
      onupdate={linkObserver}
    >
      {childlen}
    </a>
