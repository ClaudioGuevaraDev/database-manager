import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { BsDatabaseFillX } from 'react-icons/bs'

import ConnectionCard from './ConnectionCard'

interface Props {
  isPlayground: boolean
}

function ConnectionList({ isPlayground }: Props): JSX.Element {
  const { connections, searchConnection, selectedEngines } = useConnectionsStore()
  const { t } = useTranslation()

  const filterConnections = connections
    .filter((connection) => (isPlayground ? !connection.active : connection))
    .filter((connection) =>
      searchConnection === ''
        ? true
        : connection.name.toLowerCase().includes(searchConnection.toLowerCase())
    )
    .filter((connection) => Array.from(selectedEngines).includes(connection.engine))

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {filterConnections.map((connection) => (
        <ConnectionCard key={connection.id} connection={connection} isPlayground={isPlayground} />
      ))}

      {connections.length > 0 &&
        filterConnections.length === 0 &&
        (searchConnection !== '' || Array.from(selectedEngines).length === 0 || isPlayground) && (
          <div className="col-span-12 mt-16 flex flex-col items-center justify-center gap-6">
            <BsDatabaseFillX className="h-20 w-20" />
            <p className="text-3xl font-semibold">{t('home.list.without_connections')}</p>
          </div>
        )}
    </div>
  )
}

export default ConnectionList
