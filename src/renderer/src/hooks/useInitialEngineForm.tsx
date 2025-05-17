import { Connection } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useEffect } from 'react'

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

    const connectionsParsed = JSON.parse(connectionsStore) as Connection[]

    if (connectionsParsed.length === 0) {
      onOpenChangeEngineDatabaseForm()
      return
    }
  }, [connections, loadingConnections])

  return
}

export default useInitialEngineForm
