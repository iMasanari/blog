import { loadDefaultJapaneseParser } from 'budoux'
import opentype from 'opentype.js'
import { SITE_NAME } from '#src/constants'

const japaneseParser = loadDefaultJapaneseParser()

const parseLine = (text: string, width: number, fontData: ArrayBuffer, fontSize: number) => {
  const words = japaneseParser.parse(text)
  const font = opentype.parse(fontData)

  let currentValue = ''
  const columns: string[] = []

  for (const word of words) {
    if (width < font.getAdvanceWidth(currentValue + word, fontSize)) {
      // 次の行にする
      columns.push(currentValue)
      currentValue = word
    } else {
      currentValue += word
    }
  }

  if (currentValue) {
    columns.push(currentValue)
  }

  return columns
}

const Box = (style: Record<string, unknown>, children?: () => unknown) =>
  ({ type: 'div', props: { style, children: children?.() } })

export default (props: { title: string, tags: string[], fontData: ArrayBuffer }) =>
  Box({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(226 232 240)',
    color: 'rgb(15 23 42)',
  }, () => [
    Box({ marginBottom: 32, fontSize: 40 }, () =>
      `- ${SITE_NAME} -`
    ),
    Box({
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 1000,
      padding: '32px 44px',
      marginBottom: 32,
      borderRadius: 12,
      boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #fff, inset 0 0 0 #bebebe, inset 0 0 0 #fff',
    }, () => [
      Box({
        display: 'flex',
        flexDirection: 'column',
        fontSize: 40,
        marginBottom: 16,
      }, () =>
        parseLine(props.title, 1000 - 44 * 2, props.fontData, 40).map((word) =>
          Box({}, () => word)
        )
      ),
      Box({ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }, () =>
        props.tags.map(tag =>
          Box({ fontSize: 30, color: 'rgb(37 99 235)', marginRight: '0.5em' }, () =>
            `#${tag}`
          )
        )
      ),
    ]),
  ])
