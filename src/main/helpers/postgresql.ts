import { Client } from 'pg'

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
    await this.client.connect()
    await this.client.query('SELECT NOW()')
  }
}
