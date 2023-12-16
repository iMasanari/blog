import { css } from 'molcss'

export const codeWrapper = css`
  overflow: hidden;
  margin: 2rem 0 /* 32px 0 */;
  border-radius: 0.25rem /* 4px */;
  box-shadow: 0 0 0 #bebebe,
    0 0 0 #fff,
    inset 2px 2px 4px #bebebe,
    inset -2px -2px 4px #fff;
`

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem /* 8px 16px */;
`

export const fileName = css`
  display: flex;
  align-items: center;
`

export const fileIcon = css`
  width: 1rem /* 16px */;
  height: 1rem /* 16px */;
  margin-right: 0.25rem /* 4px */;
`
