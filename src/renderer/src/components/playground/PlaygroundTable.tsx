import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { JSX } from 'react'

function PlaygroundTable(): JSX.Element {
  return (
    <div className="flex-1">
      <Table shadow="md">
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
