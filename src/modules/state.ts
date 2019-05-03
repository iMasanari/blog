export interface Data {
  component: number
  title: string
  props: any
}

const state = {
  data: (window.__data || {}) as Data,
}

export type State = typeof state

export default state
