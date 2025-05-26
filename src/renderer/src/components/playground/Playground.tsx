import { Card, CardBody } from '@heroui/react'
import { Connection } from '@renderer/interfaces/connection'
import { DatabasesWithInfo } from '@renderer/interfaces/playground'
import { useSettingsStore } from '@renderer/store/settingsStore'
import clsx from 'clsx'
import { JSX, useEffect } from 'react'

import PlaygroundEditor from './PlaygroundEditor'
import PlaygroundSidebar from './PlaygroundSidebar'
import PlaygroundTable from './PlaygroundTable'

interface Props {
  selectedConnection: string | number | undefined
}

function Playground({ selectedConnection }: Props): JSX.Element {
  const { showSidebar } = useSettingsStore()

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

    const databases = (await window.electron.ipcRenderer.invoke(
      'list_databases_with_info',
      connection
    )) as DatabasesWithInfo[]

    console.log(databases)
  }

  useEffect(() => {
    listDatabasesWithInfo()
  }, [selectedConnection])

  return (
    <Card className="flex-1">
      <CardBody className="grid grid-cols-12 gap-4 p-0">
        {showSidebar && (
          <div className="col-span-3 overflow-hidden opacity-100 2xl:col-span-2">
            <PlaygroundSidebar />
          </div>
        )}

        <div
          className={clsx(
            'flex flex-1 flex-col space-y-4 pr-3 pt-3',
            showSidebar ? 'col-span-9 2xl:col-span-10' : 'col-span-12 pl-3'
          )}
        >
          <PlaygroundEditor />
          <PlaygroundTable />
        </div>
      </CardBody>
    </Card>
  )
}

export default Playground
