import { h, VNode } from 'hyperapp'
import linkObserver from './linkObserver'
import { State, Actions } from '..'

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
