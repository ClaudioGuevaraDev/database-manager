import { Selection } from '@heroui/react'
import { Connection, engines } from '@renderer/interfaces/connection'
import { create } from 'zustand'

interface ConnectionStore {
  connections: Connection[]
  loadingConnections: boolean
  searchConnection: string
  selectedEngines: Selection
  handleConnections: (value: Connection[]) => void
  handleLoadingConnections: (value: boolean) => void
  handleSearchConnection: (value: string) => void
  handleSelectedEngines: (value: Selection) => void
}

export const useConnectionsStore = create<ConnectionStore>((set) => ({
  connections: [],
  loadingConnections: true,
  searchConnection: '',
  selectedEngines: new Set(engines.map((engine) => engine.toString())),
  handleConnections(value): void {
    if (value.length > 0) {
      set({ connections: value })
    } else {
      set({
        connections: value,
        searchConnection: '',
        selectedEngines: new Set(engines.map((engine) => engine.toString()))
      })
    }
  },
  handleLoadingConnections(value): void {
    set({ loadingConnections: value })
  },
  handleSearchConnection(value): void {
    set({ searchConnection: value })
  },
  handleSelectedEngines(value): void {
    set({ selectedEngines: value })
  }
}))
