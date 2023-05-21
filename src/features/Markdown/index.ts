import Link from '../../components/Link.astro'
import Blockquote from './components/Blockquote.astro'
import Code from './components/Code.astro'
import CodeWrapper from './components/CodeWrapper.astro'
import H2 from './components/H2.astro'
import H3 from './components/H3.astro'
import H4 from './components/H4.astro'
import Ol from './components/Ol.astro'
import P from './components/P.astro'
import Pre from './components/Pre.astro'
import Ul from './components/Ul.astro'

export const components = {
  a: Link,
  code: Code,
  pre: Pre,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  'app-code-wrapper': CodeWrapper,
}
