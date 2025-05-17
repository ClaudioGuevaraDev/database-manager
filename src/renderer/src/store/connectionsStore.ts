import { Connection } from '@renderer/interfaces/connection'
import { create } from 'zustand'

interface ConnectionStore {
  connections: Connection[]
  loadingConnections: boolean
  handleConnections: (value: Connection[]) => void
  handleLoadingConnections: (value: boolean) => void
}

export const useConnectionsStore = create<ConnectionStore>((set) => ({
  connections: [],
  loadingConnections: true,
  handleConnections(value): void {
    set({ connections: value })
  },
  handleLoadingConnections(value): void {
    set({ loadingConnections: value })
  }
}))
