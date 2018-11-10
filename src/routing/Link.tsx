import { h, VNode } from 'hyperapp'
import page from 'page'
import { preload } from './preload'
import smoothScroll from '../util/smoothScroll'

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

const clickHandler = (e: Event) => {
  const el = e.currentTarget as HTMLAnchorElement
  if (!/$http/.test(el.getAttribute('href'))) {
    e.preventDefault()
    page(el.href)
    smoothScroll()
  }
}

export const Link = ({ to, ...props }: Props, childlen?: VNode): VNode<Props> =>
  <a {...props} href={to} onclick={clickHandler} oncreate={updateHandler} onupdate={updateHandler}  >
    {childlen}
  </a>
