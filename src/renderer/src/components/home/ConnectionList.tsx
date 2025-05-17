import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { JSX } from 'react'

import ConnectionCard from './ConnectionCard'

function ConnectionList(): JSX.Element {
  const { connections } = useConnectionsStore()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
      {connections.map((connection) => (
        <ConnectionCard key={connection.id} connection={connection} />
      ))}
    </div>
  )
}

export default ConnectionList
