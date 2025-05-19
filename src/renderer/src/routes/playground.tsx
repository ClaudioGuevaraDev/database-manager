import { Button, Card, CardBody, Tab, Tabs } from '@heroui/react'
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
              <Button isIconOnly size="sm" variant="light" className="-mr-2.5">
                <RxCross1 className="w-3 h-3" />
              </Button>
            </div>
          }
          className="flex-1 flex"
        >
          <Card className="flex-1">
            <CardBody className="grid grid-cols-12 p-0">
              <div className="col-span-2 border border-red-500">sidebar</div>
              <div className="col-span-10 border border-blue-500 flex-1 flex flex-col">
                <div className="min-h-32 border border-green-500 bg-green-500">
                  Playground para el sql
                </div>
                <div className="flex-1 border border-cyan-500 bg-cyan-500">Tabla</div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          title={
            <div className="flex items-center gap-1.5">
              <span>PostgreSQL</span>
              <Button isIconOnly size="sm" variant="light" className="-mr-2.5">
                <RxCross1 className="w-3 h-3" />
              </Button>
            </div>
          }
          className="flex-1 flex"
        >
          <Card className="flex-1">
            <CardBody>asd</CardBody>
          </Card>
        </Tab>

        <Tab>
          <FaPlus className="w-4 h-4" />
        </Tab>
      </Tabs>
    </div>
  )
}
