import { Selection } from '@heroui/react'
import { create } from 'zustand'

interface SettingsState {
  mode: string
  language: Selection
  handleMode: (value: string) => void
  handleLanguage: (value: Selection) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  mode: '',
  language: new Set([]),
  handleMode(value): void {
    set({ mode: value })
  },
  handleLanguage(value): void {
    set({ language: value })
  }
}))
