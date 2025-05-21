import { Chip, Tab, Tabs } from '@heroui/react'
import Playground from '@renderer/components/playground/Playground'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { JSX } from 'react'
import { FaPlus } from 'react-icons/fa'

export const Route = createFileRoute('/playground')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  const { connections, handleConnections } = useConnectionsStore()
  const navigate = useNavigate()

  const handleDesactiveConnection = (id: string): void => {
    const newConnections = connections.map((connection) =>
      connection.id === id ? { ...connection, active: false } : connection
    )

    localStorage.setItem('connections', JSON.stringify(newConnections))
    handleConnections(newConnections)

    const check = newConnections.some((connection) => connection.active)

    if (!check) {
      navigate({ to: '/' })
    }
  }

  return (
    <div className="h-full min-h-screen flex flex-col pt-2 px-2">
      <Tabs aria-label="connections" variant="light" size="lg" color="primary">
        {connections
          .filter((connection) => connection.active)
          .map((connection) => (
            <Tab
              key={connection.id}
              title={
                <Chip
                  className="bg-transparent"
                  onClose={() => handleDesactiveConnection(connection.id)}
                >
                  {connection.name}
                </Chip>
              }
              className="flex-1 flex"
            >
              <Playground />
            </Tab>
          ))}

        <Tab>
          <FaPlus className="w-4 h-4" />
        </Tab>
      </Tabs>
    </div>
  )
}
