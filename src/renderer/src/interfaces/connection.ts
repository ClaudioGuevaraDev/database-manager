export const engines = ['PostgreSQL', 'MySQL'] as const
export type Engine = (typeof engines)[number]

export interface Connection {
  name: string
  engine: Engine
  host: string
  port: string
  username: string
  password: string
  database: string
  ssl: boolean
}
