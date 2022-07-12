import { LoginResponse, User } from '../models'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { clearTokens, setTokens } from '../utils'

type AuthStore = {
  user?: Pick<User, 'id' | 'name'>
  login: (response: LoginResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      loading: false,
      login: response => {
        const { id, name, ...token } = response
        setTokens(token)
        set({
          user: {
            id,
            name,
          },
        })
      },
      logout: () => {
        set({ user: undefined })
        clearTokens()
      },
    }),
    { name: 'authStore' }
  )
)
