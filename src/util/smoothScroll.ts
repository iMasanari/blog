export default () => {
  let loopCount = 10

  const loop = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scroll = loopCount ? Math.floor(scrollTop / loopCount) : 0

      scrollTo(0, scrollTop - scroll)

      if (loopCount-- && scroll) {
          requestAnimationFrame(loop)
      }
  }

  loop()
}
