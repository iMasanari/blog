import type { HTMLAttributes } from 'astro/types'
import { css, mergeStyle } from 'molcss'

const styleClassNameRecord = new Map<`${string}:${string}`, string>([
  ['color:#24292E', css`color: #24292e;`],
  ['color:#B31D28', css`color: #b31d28;`],
  ['color:#22863A', css`color: #22863a;`],
  ['color:#005CC5', css`color: #005cc5;`],
  ['color:#032F62', css`color: #032f62;`],
  ['color:#6F42C1', css`color: #6f42c1;`],
  ['color:#D73A49', css`color: #d73a49;`],
  ['color:#6A737D', css`color: #6a737d;`],
  ['color:#E36209', css`color: #e36209;`],
  ['userSelect:none', css`user-select: none;`],
  ['fontWeight:bold', css`font-weight: bold;`],
  ['fontStyle:italic', css`font-style: italic;`],
])

export const createProps = (props: HTMLAttributes<'span'>) => {
  if (!props.style || typeof props.style !== 'object') {
    return props
  }

  const styleList = Object.entries(props.style).map(([prop, value]) => ({
    prop,
    value,
    className: styleClassNameRecord.get(`${prop}:${value}`),
  }))

  const warn = styleList.find(v => !v.className)

  if (warn) {
    console.warn(`[Markdown/Span] Not match ${warn.prop}:${warn.value}`)
    return props
  }

  return {
    ...props,
    class: mergeStyle(...styleList.map(v => v.className), props.class),
    style: undefined,
  }
}
