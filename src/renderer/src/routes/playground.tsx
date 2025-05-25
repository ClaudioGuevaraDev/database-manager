import { Button, Chip, Tab, Tabs, useDisclosure } from '@heroui/react'
import SettingsModal from '@renderer/components/general/SettingsModal'
import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import Playground from '@renderer/components/playground/Playground'
import useHandleSelectedConnection from '@renderer/hooks/playground/useHandleSelectedConnection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { JSX, useState } from 'react'
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

  useHandleSelectedConnection({ setSelectedConnection })

  const navigate = useNavigate()

  const { connections, handleConnections } = useConnectionsStore()
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  const checkConnection = connections.find((connection) => connection.id === selectedConnection)

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
    const newConnections = connections.map((connection) => ({
      ...connection,
      active: false,
      position: 0
    }))

    localStorage.setItem('connections', JSON.stringify(newConnections))
    handleConnections(newConnections)

    navigate({ to: '/' })
  }

  const filterConnections = connections
    .filter((connection) => connection.active)
    .sort((a, b) => a.position - b.position)

  if (
    selectedConnection == null ||
    (typeof selectedConnection === 'string' &&
      selectedConnection.startsWith(`$.${filterConnections.length + 1}`))
  ) {
    return <></>
  }

  return (
    <>
      <div className="h-screen flex flex-col pt-2 pb-3 px-3">
        <div className="flex items-center gap-2 mb-2">
          <Tabs
            aria-label="connections"
            variant="light"
            size="lg"
            color="primary"
            selectedKey={selectedConnection}
            onSelectionChange={setSelectedConnection}
            className="flex-1"
          >
            {connections
              .filter((connection) => connection.active)
              .sort((a, b) => a.position - b.position)
              .map((connection) => (
                <Tab
                  key={connection.id}
                  title={
                    <Chip
                      className={`bg-transparent ${
                        connection.id === selectedConnection
                          ? 'text-white '
                          : 'text-gray-900 dark:text-white'
                      }`}
                      onClose={() => handleDesactiveConnection(connection.id)}
                    >
                      {connection.name}
                    </Chip>
                  }
                />
              ))}

            <Tab title={<FaPlus className="w-4 h-4" />} />
          </Tabs>

          <div className="flex items-center gap-2">
            <Button isIconOnly variant="bordered" onPress={closeAllTabs}>
              <VscCloseAll className="w-6 h-6" />
            </Button>
            <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
              <IoMdSettings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {checkConnection ? (
            <Playground />
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-3 space-y-4 flex flex-col">
                <HomeMenu isPlayground={true} />
                <ConnectionList isPlayground={true} />
              </div>
            </div>
          )}
        </div>

        <SettingsModal
          isOpen={isOpenSettings}
          onOpenChange={onOpenChangeSettings}
          onClose={onCloseSettings}
        />
      </div>
    </>
  )
}
