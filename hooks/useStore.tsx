import create from "zustand"

interface AppState {
    readonly signUpVisible: boolean
    // eslint-disable-next-line functional/no-return-void
    readonly setSignUpVisible: (visible: boolean) => void
}

export const useStore = create<AppState>((set) => ({
    signUpVisible: true,
    setSignUpVisible: (visible) => set({ signUpVisible: visible }),
}))
