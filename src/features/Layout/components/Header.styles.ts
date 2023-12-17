import { css } from 'molcss'

export const header = css`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  background-color: rgb(226 232 240 / 0.3);
  backdrop-filter: blur(8px);
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 300ms;
`

export const headerHidden = css`
  transform: translateY(-100%);
`

export const headerContent = css`
  display: flex;
  padding: 1rem 1.5rem;
  margin: 0 auto;
  align-items: center;
  max-width: 64rem;
`

export const siteTitle = css`
  margin-right: auto;
`

export const title = css`
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
`

export const titleLink = css`
  &:hover {
    text-decoration: underline;
  }
`

export const siteDescription = css`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  color: rgb(55 65 81);
`

export const navItem = css`
  padding: 0.25rem 1rem /* 4px 16px */;
  margin-left: 0.5rem /* 8px */;
  border-radius: 0.25rem /* 4px */;
  background-color: rgb(226 232 240);
  box-shadow: 2px 2px 4px #bebebe,
    -2px -2px 4px #fff,
    inset 0 0 0 #bebebe,
    inset 0 0 0 #fff;
  transition: box-shadow cubic-bezier(0.4, 0, 0.2, 1) 150ms;

  &:hover {
    box-shadow: 0 0 0 #bebebe,
      0 0 0 #fff,
      inset 2px 2px 4px #bebebe,
      inset -2px -2px 4px #fff;
  }
`
