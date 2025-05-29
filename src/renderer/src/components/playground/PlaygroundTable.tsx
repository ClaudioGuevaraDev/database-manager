import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { JSX } from 'react'

function PlaygroundTable(): JSX.Element {
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
