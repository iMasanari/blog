import { h, VNode } from "hyperapp"
// @ts-ignore
import { Link as RouterLink, location } from "@hyperapp/router"
import { preload } from "./preload"

/** Link */
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

export const Link = (props: Props, childlen?: VNode): VNode<Props> =>
  h(RouterLink, {
    ...props,
    oncreate: updateHandler,
    onupdate: updateHandler,
  }, childlen)

export { location }
