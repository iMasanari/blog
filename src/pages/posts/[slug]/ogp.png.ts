import { readFile } from 'node:fs/promises'
import { Resvg } from '@resvg/resvg-js'
import type { APIContext } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import satori from 'satori'
import OgbImage from '#src/features/OgbImage/OgbImage'

const fontPath = 'src/assets/font/NotoSansJP/NotoSansJP-Regular.ttf'

interface Props {
  post: CollectionEntry<'posts'>
}

export const getStaticPaths = async () => {
  const posts = await getCollection('posts')

  return posts.map((post) =>
    ({ params: { slug: post.slug }, props: { post } })
  )
}

export const GET = async ({ props }: APIContext<Props>) => {
  const { title, tags } = props.post.data
  const fontData = new Uint8Array(await readFile(fontPath)).buffer

  const svg = await satori(OgbImage({ title, tags, fontData }), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Noto Sans JP', data: fontData },
    ],
  })

  const image = new Resvg(svg, { font: { loadSystemFonts: false } }).render()

  return new Response(image.asPng())
}
