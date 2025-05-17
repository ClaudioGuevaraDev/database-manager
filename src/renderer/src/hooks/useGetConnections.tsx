import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useEffect } from 'react'
import { toast } from 'sonner'

function useGetConnections(): void {
  const { handleConnections, handleLoadingConnections } = useConnectionsStore()

  useEffect(() => {
    const connectionsStore = localStorage.getItem('connections')

    if (connectionsStore != null) {
      try {
        handleConnections(JSON.parse(connectionsStore))
      } catch (error) {
        console.error(error)
        toast.error('Error al listar conexiones')
      }
    } else {
      handleConnections([])
    }
    handleLoadingConnections(false)
  }, [])

  return
}

export default useGetConnections
