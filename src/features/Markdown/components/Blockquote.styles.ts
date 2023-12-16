import { css } from 'molcss'

export const blockquote = css`
  position: relative;
  padding: 2rem 1rem 0.5rem /* 32px 16px 8px */;
  border-radius: 0.25rem /* 4px */;
  box-shadow: 0 0 0 #bebebe,
    0 0 0 #fff,
    inset 2px 2px 4px #bebebe,
    inset -2px -2px 4px #fff;
    
  &::before {
    content: '“';
    position: absolute;
    top: 0.5rem /* 8px */;
    left: 1rem /* 16px */;
    font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 3.75rem /* 60px */;
    line-height: 1;
    text-shadow: 2px 2px 4px #bebebe, -2px -2px 4px #fff;
    color: rgb(226 232 240);
  }
`
