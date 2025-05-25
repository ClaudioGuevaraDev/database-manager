export const engines = ['PostgreSQL', 'MySQL'] as const
type Engine = (typeof engines)[number]

export interface Connection {
  id: string
  name: string
  engine: Engine
  host: string
  port: string
  username: string
  password: string
  database: string
  ssl: boolean
}

export interface DatabasesWithInfo {
  name: string
  tables: string[]
}
