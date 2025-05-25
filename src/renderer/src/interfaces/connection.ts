import { Selection } from '@heroui/react'

export const engines = ['PostgreSQL', 'MySQL'] as const
export type Engine = (typeof engines)[number]

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
  active: boolean
  position: number
}

export interface ConnectionForm {
  name: string
  engine: Selection
  host: string
  port: string
  username: string
  password: string
  database: string
  ssl: boolean
}
