import { Card, CardBody } from '@heroui/react'
import useListDatabasesWithInfo from '@renderer/hooks/playground/useListDatabasesWithInfo'
import { useSettingsStore } from '@renderer/store/settingsStore'
import clsx from 'clsx'
import { JSX } from 'react'

import PlaygroundEditor from './PlaygroundEditor'
import PlaygroundSidebar from './PlaygroundSidebar'
import PlaygroundTable from './PlaygroundTable'

interface Props {
  selectedConnection: string | number | undefined
}

function Playground({ selectedConnection }: Props): JSX.Element {
  const { showSidebar } = useSettingsStore()

  const { databasesTree, setDatabasesTree } = useListDatabasesWithInfo({ selectedConnection })

  return (
    <Card className="flex-1">
      <CardBody className="grid grid-cols-12 gap-4 p-0">
        {showSidebar && (
          <div className="col-span-3 overflow-y-auto opacity-100 2xl:col-span-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-default-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
            <PlaygroundSidebar tree={databasesTree} setTree={setDatabasesTree} />
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
