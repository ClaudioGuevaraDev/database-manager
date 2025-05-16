import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import useGetConnections from '@renderer/hooks/useGetConnections'
import { Connection } from '@renderer/interfaces/connection'
import { createFileRoute } from '@tanstack/react-router'
import { JSX, useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  const [connections, setConnections] = useState<Connection[] | undefined>(undefined)

  useGetConnections({ setConnections })

  if (connections == null) {
    return <></>
  }

  return (
    <div className="p-4 space-y-4">
      <HomeMenu connections={connections} setConnections={setConnections} />

      <ConnectionList connections={connections} />
    </div>
  )
}
