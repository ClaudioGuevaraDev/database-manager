import { Tab, Tabs } from '@heroui/react'
import Playground from '@renderer/components/playground/Playground'
import { createFileRoute } from '@tanstack/react-router'
import { JSX } from 'react'
import { FaPlus } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

export const Route = createFileRoute('/playground')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <div className="h-full min-h-screen flex flex-col pt-2 px-2">
      <Tabs aria-label="connections" variant="light" size="lg" color="primary">
        <Tab
          title={
            <div className="flex items-center gap-1.5">
              <span>PostgreSQL</span>
              <RxCross1 className="w-3 h-3" />
            </div>
          }
          className="flex-1 flex"
        >
          <Playground />
        </Tab>

        <Tab>
          <FaPlus className="w-4 h-4" />
        </Tab>
      </Tabs>
    </div>
  )
}
