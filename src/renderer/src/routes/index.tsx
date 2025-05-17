import ConnectionList from '@renderer/components/home/ConnectionList'
import HomeMenu from '@renderer/components/home/HomeMenu'
import useGetConnections from '@renderer/hooks/useGetConnections'
import { createFileRoute } from '@tanstack/react-router'
import { JSX } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  useGetConnections()

  return (
    <div className="p-4 space-y-4">
      <HomeMenu />

      <ConnectionList />
    </div>
  )
}
