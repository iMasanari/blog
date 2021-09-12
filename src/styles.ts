import { createGenerateClassName } from '@material-ui/core'

export const getGenerateClassName = () =>
  createGenerateClassName({
    productionPrefix: 'c',
    disableGlobal: true,
  })
