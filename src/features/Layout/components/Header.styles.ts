import { css } from 'molcss'

export const header = css`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  background-color: rgb(226 232 240 / 0.3);
  backdrop-filter: blur(8px);
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 300ms;

  &[data-header=hidden] {
    transform: translateY(-100%);
  }
`

export const headerContent = css`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  margin: 0 auto;
  align-items: center;
  max-width: 64rem;
`

export const siteTitle = css`
  margin-left: 1rem;
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

export const nav = css`
  display: flex;
  margin: 0.25rem 0 0.25rem auto;
`

export const navItem = css`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
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

export const menuIcon = css`
  margin-right: 0.25rem;
  width: 1.5rem /* 24px */;
  height: 1.5rem /* 24px */;
`
