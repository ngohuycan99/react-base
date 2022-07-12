import { TokenResponse } from '../models'
import { KEYS } from './constant'

export const setTokens = ({ accessToken, refreshToken }: TokenResponse) => {
  localStorage.setItem(KEYS.AUTH.ACCESS_TOKEN, accessToken)
  localStorage.setItem(KEYS.AUTH.REFRESH_TOKEN, refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem(KEYS.AUTH.ACCESS_TOKEN)
  localStorage.removeItem(KEYS.AUTH.REFRESH_TOKEN)
}
