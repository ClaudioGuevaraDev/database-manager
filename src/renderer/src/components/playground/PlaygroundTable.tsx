import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { Connection } from '@renderer/interfaces/connection'
import { JSX, useEffect } from 'react'

interface Props {
  selectedConnection: string | number | undefined
  database: string | undefined
  table: string | undefined
}

function PlaygroundTable({ selectedConnection, database, table }: Props): JSX.Element {
  useEffect(() => {
    if (selectedConnection == null || database == null || table == null) {
      return
    }

    const connections = localStorage.getItem('connections')

    if (connections == null) {
      return
    }

    const parsedConnections = JSON.parse(connections) as Connection[]
    const filterConnections = parsedConnections.filter((connection) => connection.active)

    const connection = filterConnections.find((connection) => connection.id === selectedConnection)

    console.log(connection)
    console.log(database)
    console.log(table)
  }, [selectedConnection, database, table])

  return (
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-default-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
      <Table shadow="none" aria-label="table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default PlaygroundTable
