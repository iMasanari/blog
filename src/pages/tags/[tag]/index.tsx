import { GetStaticPaths } from 'next'
import { getTags } from '~/static-api/contests'
import Tags, { getStaticProps } from './[page]'

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getTags()
  const paths = tags.map(tag => `/tags/${tag}`)

  return { paths, fallback: false }
}

export { getStaticProps }
export default Tags
