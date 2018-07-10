export default () => {
  const targetY = 0
  const scrollY = document.documentElement.scrollTop || document.body.scrollTop
  let loopCount = 10
  const scrollby = (targetY - scrollY) / loopCount

  const loop = () => {
    scrollTo(0, Math.floor(targetY - scrollby * loopCount))

    if (loopCount--) {
      requestAnimationFrame(loop)
    }
  }

  loop()
}
