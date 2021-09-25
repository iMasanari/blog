import createCache from '@emotion/cache'

export const createEmotionCache = () =>
  createCache({ key: 'c', prepend: true })
