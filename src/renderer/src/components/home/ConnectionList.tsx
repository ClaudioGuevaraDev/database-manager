import { Connection } from '@renderer/interfaces/connection'
import { JSX } from 'react'

import ConnectionCard from './ConnectionCard'

interface Props {
  connections: Connection[]
}

function ConnectionList({ connections }: Props): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
      {connections.map((connection, index) => (
        <ConnectionCard key={`${index}-${connection.name}`} connection={connection} />
      ))}
    </div>
  )
}

export default ConnectionList
