import { Button, Chip, Tab, Tabs, useDisclosure } from '@heroui/react'
import SettingsModal from '@renderer/components/general/SettingsModal'
import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import Playground from '@renderer/components/playground/Playground'
import useHandleSelectedConnection from '@renderer/hooks/playground/useHandleSelectedConnection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useSettingsStore } from '@renderer/store/settingsStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { JSX, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'
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
  const { showSidebar, handleShowSidebar } = useSettingsStore()

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
      <div className="flex h-screen flex-col px-3 pb-3 pt-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="-mr-1">
            <Button isIconOnly variant="bordered" onPress={() => handleShowSidebar(!showSidebar)}>
              {showSidebar ? (
                <GoSidebarExpand className="h-6 w-6" />
              ) : (
                <GoSidebarCollapse className="h-6 w-6" />
              )}
            </Button>
          </div>

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
                          ? 'text-white'
                          : 'text-gray-900 dark:text-white'
                      }`}
                      onClose={() => handleDesactiveConnection(connection.id)}
                    >
                      {connection.name}
                    </Chip>
                  }
                />
              ))}

            <Tab title={<FaPlus className="h-4 w-4" />} />
          </Tabs>

          <div className="flex items-center gap-2">
            <Button isIconOnly variant="bordered" onPress={closeAllTabs}>
              <VscCloseAll className="h-6 w-6" />
            </Button>
            <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
              <IoMdSettings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {checkConnection ? (
            <Playground selectedConnection={selectedConnection} />
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col space-y-4 p-3">
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
