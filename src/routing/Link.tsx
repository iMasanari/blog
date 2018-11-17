import { h, VNode } from 'hyperapp'
import { preload } from './preload'
import { State, Actions } from '..';

interface Props {
  [key: string]: any
  to: string;
  location?: Location;
}

const updateHandler = (el: HTMLAnchorElement) => {
  const href = el.getAttribute('href')

  if (!/$http/.test(href)) {
    preload(href)
  }
}

export const Link = ({ to, ...props }: Props, childlen?: VNode) =>
  (_state: State, actions: Actions) =>
    <a {...props} href={to} onclick={actions.linkHandler} oncreate={updateHandler} onupdate={updateHandler}  >
      {childlen}
    </a>
