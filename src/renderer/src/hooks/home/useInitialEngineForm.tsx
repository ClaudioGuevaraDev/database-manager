import { addToast } from '@heroui/toast'
import { Connection } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onOpenChangeEngineDatabaseForm: () => void
}

function useInitialEngineForm({ onOpenChangeEngineDatabaseForm }: Props): void {
  const { connections, loadingConnections } = useConnectionsStore()
  const { t } = useTranslation()

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
      addToast({
        title: t('home.menu.error_start_application'),
        color: 'danger'
      })
    }
  }, [connections, loadingConnections])

  return
}

export default useInitialEngineForm
