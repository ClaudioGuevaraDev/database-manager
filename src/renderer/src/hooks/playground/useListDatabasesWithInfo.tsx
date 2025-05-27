import { addToast } from '@heroui/toast'
import { Connection } from '@renderer/interfaces/connection'
import { DatabasesWithInfo, Tree } from '@renderer/interfaces/playground'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  selectedConnection: string | number | undefined
}

function useListDatabasesWithInfo({ selectedConnection }: Props): {
  databasesTree: Tree
  setDatabasesTree: (value: Tree) => void
} {
  const [databasesTree, setDatabasesTree] = useState<Tree>({
    name: '',
    metadata: { id: uuidv4(), active: false, type: '' },
    children: []
  })

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

  const listDatabasesWithInfo = async (): Promise<void> => {
    const connections = localStorage.getItem('connections')

    if (connections == null) {
      return
    }

    const parsedConnections = JSON.parse(connections) as Connection[]

    const connection = parsedConnections.find((connection) => connection.id === selectedConnection)

    if (connection == null) {
      return
    }

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

        return
      }

      const tree = parserDatabasesWithInfoToTree(databases)
      setDatabasesTree(tree)
    } catch (error) {
      console.error(error)
      addToast({
        title: t('home.menu.connection_error'),
        color: 'danger'
      })
    }
  }

  useEffect(() => {
    listDatabasesWithInfo()
  }, [selectedConnection])

  return { databasesTree: databasesTree, setDatabasesTree: setDatabasesTree }
}

export default useListDatabasesWithInfo
