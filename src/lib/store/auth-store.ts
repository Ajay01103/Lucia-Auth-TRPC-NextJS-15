import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  email: string | null
  setEmail: (email: string) => void
  clearEmail: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
    }),
    {
      name: "auth-store",
    }
  )
)
