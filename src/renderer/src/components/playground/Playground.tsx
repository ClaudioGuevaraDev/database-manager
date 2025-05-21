import { Card, CardBody } from '@heroui/react'
import { JSX } from 'react'

import PlaygroundEditor from './PlaygroundEditor'
import PlaygroundSidebar from './PlaygroundSidebar'
import PlaygroundTable from './PlaygroundTable'

function Playground(): JSX.Element {
  return (
    <Card className="flex-1">
      <CardBody className="grid grid-cols-12 p-0 gap-4">
        <div className="col-span-2">
          <PlaygroundSidebar />
        </div>
        <div className="col-span-10 flex-1 flex flex-col space-y-4 pt-3 pr-3">
          <PlaygroundEditor />
          <PlaygroundTable />
        </div>
      </CardBody>
    </Card>
  )
}

export default Playground
