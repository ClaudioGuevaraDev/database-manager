import { DatabaseTree } from '@renderer/interfaces/playground'
import { create } from 'zustand'

interface DatabasesTreeState {
  databasesTree: DatabaseTree[]
  handleDatabasesTree: (value: DatabaseTree[]) => void
}

export const useDatabasesTreeStore = create<DatabasesTreeState>((set) => ({
  databasesTree: [],
  handleDatabasesTree(value): void {
    set({ databasesTree: value })
  }
}))
