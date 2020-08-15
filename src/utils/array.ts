export const range = (n: number) => {
  const arr = new Array<number>(n)

  for (let i = 0; i < n; ++i) {
    arr[i] = i
  }

  return arr
}
