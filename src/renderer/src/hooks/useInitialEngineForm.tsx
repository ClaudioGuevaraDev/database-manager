import { Connection } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface Props {
  onOpenChangeEngineDatabaseForm: () => void
}

function useInitialEngineForm({ onOpenChangeEngineDatabaseForm }: Props): void {
  const { connections, loadingConnections } = useConnectionsStore()

  useEffect(() => {
    if (loadingConnections) {
      return
    }

    const connectionsStore = localStorage.getItem('connections')

    if (connectionsStore == null) {
      onOpenChangeEngineDatabaseForm()
      return
    }

    try {
      const connectionsParsed = JSON.parse(connectionsStore) as Connection[]

      if (connectionsParsed.length === 0) {
        onOpenChangeEngineDatabaseForm()
        return
      }
    } catch (error) {
      console.error(error)
      toast.error('Error inesperado al iniciar aplicación')
    }
  }, [connections, loadingConnections])

  return
}

export default useInitialEngineForm
