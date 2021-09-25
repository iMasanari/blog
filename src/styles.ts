import createCache from '@emotion/cache'
import createGenerateClassName from '@mui/styles/createGenerateClassName'

export const getGenerateClassName = () =>
  createGenerateClassName({
    productionPrefix: 'j-',
    disableGlobal: true,
  })

export const createEmotionCache = () =>
  createCache({ key: 'c', prepend: true })
