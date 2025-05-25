export interface Tree {
  name: string
  metadata: {
    id: string
    type: string
    active: boolean
  }
  children: Tree[]
}

export interface DatabasesWithInfo {
  name: string
  tables: string[]
}
