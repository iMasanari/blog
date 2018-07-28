import { Data } from '../'

const loading = {} as Record<string, boolean>
export const cache = {} as Record<string, Data>

let que = [] as string[]

const loadQue = () => {
  if (!que.length) return

  const path = que.shift()
  const xhr = new XMLHttpRequest()

  xhr.open('get', `${path}index.json`)

  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText) as Data
    cache[path] = data

    loadQue()
  }

  xhr.send()
}

export const preload = (path: string) => {
  if (loading[path] || cache[path]) return

  loading[path] = true
  const length = que.push(path)

  if (length === 1) {
    loadQue()
  }
}

export const load = (path: string, callback: (data: Data) => void) => {
  if (cache[path]) {
    callback(cache[path])
    return
  }

  const xhr = new XMLHttpRequest()

  xhr.open('get', `${path}index.json`)

  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText) as Data

    cache[path] = data
    callback(data)
  }

  xhr.send()
}