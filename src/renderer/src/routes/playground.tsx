import { Button, Chip, Tab, Tabs, useDisclosure } from '@heroui/react'
import SettingsModal from '@renderer/components/general/SettingsModal'
import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import Playground from '@renderer/components/playground/Playground'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { JSX, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { VscCloseAll } from 'react-icons/vsc'

interface RouteSearch {
  id?: string
}

export const Route = createFileRoute('/playground')({
  validateSearch(search: Record<string, unknown>): RouteSearch {
    return {
      id: (search.id as string) || ''
    }
  },
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  const [selectedConnection, setSelectedConnection] = useState<string | number | undefined>(
    undefined
  )

  const { connections, handleConnections } = useConnectionsStore()
  const navigate = useNavigate()
  const search = useSearch({ from: '/playground' })
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  useEffect(() => {
    const filterConnections = connections.filter((connection) => connection.active)

    if (filterConnections.length === 0) {
      return
    }

    const foundConnection = filterConnections.find((connection) => connection.id === search.id)

    if (foundConnection != null) {
      setSelectedConnection(search.id)
    } else {
      setSelectedConnection(filterConnections[0].id)
    }
  }, [connections, search])

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

  const closeAllTabs = (): void => {
    const newConnections = connections.map((connection) => ({ ...connection, active: false }))

    localStorage.setItem('connections', JSON.stringify(newConnections))
    handleConnections(newConnections)

    navigate({ to: '/' })
  }

  return (
    <>
      <div className="h-full min-h-screen flex flex-col pt-2 px-2">
        <div className="mb-2 flex items-center justify-start pl-1 gap-2">
          <Button isIconOnly variant="bordered" onPress={closeAllTabs}>
            <VscCloseAll className="w-6 h-6" />
          </Button>
          <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
            <IoMdSettings className="w-5 h-5" />
          </Button>
        </div>

        <Tabs
          aria-label="connections"
          variant="light"
          size="lg"
          color="primary"
          selectedKey={selectedConnection}
          onSelectionChange={setSelectedConnection}
        >
          {connections
            .filter((connection) => connection.active)
            .map((connection) => (
              <Tab
                key={connection.id}
                title={
                  <Chip
                    className={`bg-transparent ${connection.id === selectedConnection ? 'text-white ' : 'text-gray-900 dark:text-white'}`}
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

          <Tab title={<FaPlus className="w-4 h-4" />}>
            <div className="p-3 space-y-4">
              <HomeMenu isPlayground={true} />
              <ConnectionList isPlayground={true} />
            </div>
          </Tab>
        </Tabs>
      </div>

      <SettingsModal
        isOpen={isOpenSettings}
        onOpenChange={onOpenChangeSettings}
        onClose={onCloseSettings}
      />
    </>
  )
}
