import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import { Connection } from '@renderer/interfaces/connection'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { JSX } from 'react'

export const Route = createFileRoute('/')({
  beforeLoad() {
    const connections = localStorage.getItem('connections')

    if (connections == null) {
      return
    }

    const parsedConnections = JSON.parse(connections) as Connection[]

    const check = parsedConnections.some((connection) => connection.active)

    if (check) {
      throw redirect({ to: '/playground' })
    }
  },
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <div className="flex h-screen flex-col">
      <div className="shrink-0 border-b border-gray-200 p-4 dark:border-default-100">
        <HomeMenu isPlayground={false} />
      </div>

      <div className="grow space-y-4 overflow-y-auto p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-default-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        <ConnectionList isPlayground={false} />
      </div>
    </div>
  )
}
