import { preload } from './preload'

const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return

    const pathname = e.target.getAttribute('href')!
    preload(pathname)
    preloadObserver!.unobserve(e.target)
  })
}

const preloadObserver = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver(intersectionObserverCallback)
  : null

export default (el: HTMLAnchorElement) => {
  const pathname = el.getAttribute('href')!

  if (!/^http/.test(pathname)) {
    if (preloadObserver) {
      preloadObserver.observe(el)
    } else {
      preload(pathname)
    }
  }
}
