import { GetStaticPaths } from 'next'
import Tags, { getStaticProps } from './[page]'
import { getTags } from '~/modules/posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getTags()
  const paths = tags.map(tag => `/tags/${tag}`)

  return { paths, fallback: false }
}

export { getStaticProps }
export default Tags
