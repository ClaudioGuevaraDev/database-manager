import { addToast } from '@heroui/toast'
import { Connection } from '@renderer/interfaces/connection'
import { DatabasesWithInfo, DatabaseTree, Tree } from '@renderer/interfaces/playground'
import { useDatabasesTreeStore } from '@renderer/store/useDatabasesTreeStore'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

function useListDatabasesWithInfo(): void {
  const { handleDatabasesTree } = useDatabasesTreeStore()

  const { t } = useTranslation()

  const parserDatabasesWithInfoToTree = (databases: DatabasesWithInfo[]): Tree => {
    const children: Tree[] = []

    databases.forEach((database) => {
      const tables: Tree[] = []

      database.tables.forEach((table) => {
        tables.push({
          name: table,
          metadata: {
            id: uuidv4(),
            type: 'table',
            active: false
          },
          children: []
        })
      })

      children.push({
        name: database.name,
        metadata: {
          id: uuidv4(),
          type: 'database',
          active: false
        },
        children: tables
      })
    })

    const tree: Tree = {
      name: '',
      metadata: { id: uuidv4(), type: '', active: false },
      children: children
    }

    return tree
  }

  const listDatabasesWithInfo = async (
    connection: Connection
  ): Promise<DatabaseTree | undefined> => {
    try {
      const databases = (await window.electron.ipcRenderer.invoke(
        'list_databases_with_info',
        connection
      )) as DatabasesWithInfo[] | boolean

      if (typeof databases === 'boolean') {
        addToast({
          title: t('home.menu.connection_error'),
          color: 'danger'
        })

        return undefined
      }

      const tree = parserDatabasesWithInfoToTree(databases)

      return {
        connectionID: connection.id,
        databases: databases,
        tree: tree
      }

      // handleDatabasesTree([...databasesTree, newDatabaseTree])
    } catch (error) {
      console.error(error)
      addToast({
        title: t('home.menu.connection_error'),
        color: 'danger'
      })

      return undefined
    }
  }

  const loadDatabasesTree = async (): Promise<void> => {
    const connections = localStorage.getItem('connections')

    if (connections == null) {
      return
    }

    const parsedConnections = JSON.parse(connections) as Connection[]

    const filterConnections = parsedConnections.filter((connection) => connection.active)

    const databasesTree: DatabaseTree[] = []
    for (const connection of filterConnections) {
      const databaseTree = await listDatabasesWithInfo(connection)

      if (databaseTree) {
        databasesTree.push(databaseTree)
      }
    }

    handleDatabasesTree(databasesTree)
  }

  useEffect(() => {
    loadDatabasesTree()
  }, [])

  return
}

export default useListDatabasesWithInfo
