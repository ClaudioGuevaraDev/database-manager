import { IpcMainInvokeEvent } from 'electron'

import { MySQL } from './helpers/mysql'
import { PostgreSQL } from './helpers/postgresql'
import { Connection, DatabasesWithInfo } from './interfaces'

export const checkConnectionDatabaseEvent = async (
  _: IpcMainInvokeEvent,
  connection: Connection
): Promise<boolean> => {
  const { database, engine, host, password, port, ssl, username } = connection

  const mysql = new MySQL(host, port, username, password, database, ssl)
  const postgres = new PostgreSQL(host, port, username, password, database, ssl)

  switch (engine) {
    case 'MySQL':
      try {
        await mysql.checkConnection()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    case 'PostgreSQL':
      try {
        await postgres.checkConnection()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    default:
      return false
  }
}

export const listDatabasesWithInfo = async (
  _: IpcMainInvokeEvent,
  connection: Connection
): Promise<DatabasesWithInfo[] | boolean> => {
  const { database, engine, host, password, port, ssl, username } = connection

  const mysql = new MySQL(host, port, username, password, database, ssl)
  const postgres = new PostgreSQL(host, port, username, password, database, ssl)

  switch (engine) {
    case 'MySQL':
      try {
        const databases = await mysql.listDatabasesWithInfo()
        return databases
      } catch (error) {
        console.error(error)
        return false
      }
    case 'PostgreSQL':
      try {
        const databases = await postgres.listDatabasesWithInfo()
        return databases
      } catch (error) {
        console.error(error)
        return false
      }
    default:
      return []
  }
}
