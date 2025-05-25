import mysql, { RowDataPacket } from 'mysql2/promise'

import { DatabasesWithInfo } from '../interfaces'

export class MySQL {
  host: string
  port: number
  username: string
  password: string
  db: string
  ssl: boolean

  constructor(
    host: string,
    port: string,
    username: string,
    password: string,
    db: string,
    ssl: boolean
  ) {
    this.host = host
    this.port = Number(port)
    this.username = username
    this.password = password
    this.db = db
    this.ssl = ssl
  }

  async checkConnection(): Promise<void> {
    const conn = await mysql.createConnection({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.db,
      ssl: this.ssl ? { rejectUnauthorized: true } : undefined
    })

    try {
      await conn.query('SELECT NOW()')
    } finally {
      await conn.end()
    }
  }

  async listDatabasesWithInfo(): Promise<DatabasesWithInfo[]> {
    const conn = await mysql.createConnection({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.db,
      ssl: this.ssl ? { rejectUnauthorized: true } : undefined
    })

    const [databasesRaw] = await conn.query('SHOW DATABASES')
    const databases = databasesRaw as RowDataPacket[]

    const result: DatabasesWithInfo[] = []

    for (const db of databases) {
      const { Database } = db as { Database: string }

      try {
        await conn.changeUser({ database: Database })

        const [tablesRaw] = await conn.query('SHOW TABLES')
        const tablesData = tablesRaw as RowDataPacket[]

        const tableNames = tablesData.map((row) => Object.values(row)[0] as string)

        result.push({ name: Database, tables: tableNames })
      } catch (error) {
        console.error(error)
      }
    }

    await conn.end()

    return result
  }
}
