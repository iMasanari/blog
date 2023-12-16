import { css } from 'molcss'

export const code = css`
  :not(pre) > & {
    padding: 0.125rem 0.5rem /* 2px 8px */;
    border-radius: 0.25rem /* 4px */;
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    background-color: rgb(203 213 225);
  }
`
