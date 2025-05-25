import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

interface Props {
  setSelectedConnection: (value: string | number | undefined) => void
}

function useHandleSelectedConnection({ setSelectedConnection }: Props): void {
  const { connections } = useConnectionsStore()
  const search = useSearch({ from: '/playground' })

  useEffect(() => {
    const filterConnections = connections
      .filter((connection) => connection.active)
      .sort((a, b) => a.position - b.position)

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

  return
}

export default useHandleSelectedConnection
