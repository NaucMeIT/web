import create from "zustand"

interface AppState {
    signUpVisible: boolean
    setSignUpVisible: (visible: boolean) => void
}

export const useStore = create<AppState>((set) => ({
    signUpVisible: true,
    setSignUpVisible: (visible) => set({ signUpVisible: visible }),
}))
