import { useAmp } from 'next/amp'
import { cloneElement, ReactNode, Children, ReactElement } from 'react'

interface Props {
  on: string
  children: ReactNode
}

export default function AmpEvents({ on, children }: Props) {
  const isAmp = useAmp()
  const child = Children.only(children) as ReactElement

  return isAmp ? cloneElement(child, { on }) : child
}
