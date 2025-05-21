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
    <div className="p-4 space-y-5">
      <HomeMenu />

      <ConnectionList />
    </div>
  )
}
