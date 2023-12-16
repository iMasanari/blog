import { css } from 'molcss'

export const button = css`
  overflow: hidden;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: box-shadow cubic-bezier(0.4, 0, 0.2, 1) 300ms;
  appearance: none;
  box-shadow: 2px 2px 4px #bebebe,
    -2px -2px 4px #fff,
    inset 0 0 0 #bebebe,
    inset 0 0 0 #fff;
    
  &:hover {
    box-shadow: 0 0 0 #bebebe,
      0 0 0 #fff,
      inset 2px 2px 4px #bebebe,
      inset -2px -2px 4px #fff;
  }
`

export const icon = css`
  width: 1rem;
  height: 1rem;
`

export const tooltip = css`
  position: fixed;
  top: 0.5rem /* 8px */;
  left: 0px;
  right: 0px;
  width: max-content;
  padding: 0.5rem 1rem /* 8px 16px */;
  border-radius: 0.25rem /* 4px */;
  margin: 0 auto;
  background-color: rgb(147 197 253);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
  /* Headerより上に表示する */
  z-index: 1;
`
