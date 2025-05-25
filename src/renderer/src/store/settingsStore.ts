import { Selection } from '@heroui/react'
import { create } from 'zustand'

interface SettingsState {
  language: Selection
  showSidebar: boolean
  handleLanguage: (value: Selection) => void
  handleShowSidebar: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: new Set([]),
  showSidebar: true,
  handleLanguage(value): void {
    set({ language: value })
  },
  handleShowSidebar(value): void {
    set({ showSidebar: value })
  }
}))
