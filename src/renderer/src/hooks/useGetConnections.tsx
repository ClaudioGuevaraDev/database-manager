import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useEffect } from 'react'

function useGetConnections(): void {
  const { handleConnections, handleLoadingConnections } = useConnectionsStore()

  useEffect(() => {
    const connectionsStore = localStorage.getItem('connections')

    if (connectionsStore != null) {
      handleConnections(JSON.parse(connectionsStore))
    } else {
      handleConnections([])
    }
    handleLoadingConnections(false)
  }, [])

  return
}

export default useGetConnections
