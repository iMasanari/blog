declare module '*.png'

declare module 'htmr' {
  import { ReactNode } from 'react'
  
  export default (text: string) => ReactNode
}