import { create } from 'zustand'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthorized' | 'error'

type AuthState = {
  status: AuthStatus
  email: string
  error: string
  setStatus: (status: AuthStatus) => void
  setEmail: (email: string) => void
  setError: (error: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  email: '',
  error: '',
  setStatus: (status) => set({ status }),
  setEmail: (email) => set({ email }),
  setError: (error) => set({ error })
}))
