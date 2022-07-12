import { User } from './user'

export type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = TokenResponse & Pick<User, 'id' | 'name'>
