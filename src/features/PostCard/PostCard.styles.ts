import { css } from 'molcss'

export const postCard = css`
  padding: 1rem /* 16px */;
  border-radius: 0.25rem /* 4px */;
  box-shadow: 2px 2px 4px #bebebe,
    -2px -2px 4px #fff,
    inset 0 0 0 #bebebe,
    inset 0 0 0 #fff;
`

export const postCardLink = css`
  transition: box-shadow cubic-bezier(0.4, 0, 0.2, 1) 150ms;
  
  &:has(.title:hover) {
    box-shadow: 0 0 0 #bebebe,
      0 0 0 #fff,
      inset 2px 2px 4px #bebebe,
      inset -2px -2px 4px #fff;
  }
`

export const dateContainer = css`
  display: flex;
  align-items: center;
`

export const postDateIcon = css`
  width: 1.5rem /* 24px */;
  height: 1.5rem /* 24px */;
  margin-right: 0.25rem /* 4px */;
`

export const updateDateIcon = css`
  width: 1.5rem /* 24px */;
  height: 1.5rem /* 24px */;
  margin-left: 0.5rem /* 8px */;
  margin-right: 0.25rem /* 4px */;
`

export const title = css`
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
`
