import { Client } from 'pg'

import { DatabasesWithInfo } from '../interfaces'

export class PostgreSQL {
  host: string
  port: string
  username: string
  password: string
  db: string
  ssl: boolean
  client: Client

  constructor(
    host: string,
    port: string,
    username: string,
    password: string,
    db: string,
    ssl: boolean
  ) {
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.db = db
    this.ssl = ssl

    this.client = new Client({
      host: host,
      port: Number(port),
      user: username,
      password: password,
      database: db,
      ssl: ssl
    })
  }

  async checkConnection(): Promise<void> {
    try {
      await this.client.connect()
      await this.client.query('SELECT NOW()')
    } finally {
      await this.client.end()
    }
  }

  async listDatabasesWithInfo(): Promise<DatabasesWithInfo[]> {
    await this.client.connect()

    const databaseRes = await this.client.query(
      'SELECT datname FROM pg_database WHERE datistemplate = false'
    )

    const databases = databaseRes.rows.map((row) => row.datname as string)

    const result: DatabasesWithInfo[] = []

    for (const db of databases) {
      const dbClient = new Client({
        host: this.host,
        port: Number(this.port),
        user: this.username,
        password: this.password,
        database: db,
        ssl: this.ssl
      })

      await dbClient.connect()

      const tableRes = await dbClient.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`
      )

      const tables = tableRes.rows.map((row) => row.table_name as string)

      result.push({ name: db, tables: tables })
    }

    return result
  }
}
