import mysql from 'mysql2/promise'

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
    await conn.query('SELECT NOW()')
  }
}
