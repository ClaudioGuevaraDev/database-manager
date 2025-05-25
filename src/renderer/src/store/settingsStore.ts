import { create } from 'zustand'

interface SettingsState {
  mode: string
  handleMode: (value: string) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  mode: '',
  handleMode(value): void {
    set({ mode: value })
  }
}))
