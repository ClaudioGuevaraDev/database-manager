import { useConnectionsStore } from '@renderer/store/connectionsStore'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { BsDatabaseFillX } from 'react-icons/bs'

import ConnectionCard from './ConnectionCard'

function ConnectionList(): JSX.Element {
  const { connections, searchConnection, selectedEngines } = useConnectionsStore()
  const { t } = useTranslation()

  const filterConnections = connections
    .filter((connection) =>
      searchConnection === ''
        ? true
        : connection.name.toLowerCase().includes(searchConnection.toLowerCase())
    )
    .filter((connection) => Array.from(selectedEngines).includes(connection.engine))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
      {filterConnections.map((connection) => (
        <ConnectionCard key={connection.id} connection={connection} />
      ))}

      {connections.length > 0 &&
        filterConnections.length === 0 &&
        (searchConnection !== '' || Array.from(selectedEngines).length === 0) && (
          <div className="flex items-center flex-col gap-6 justify-center col-span-12 mt-16">
            <BsDatabaseFillX className="w-20 h-20" />
            <p className="text-3xl font-semibold">{t('home.list.without_connections')}</p>
          </div>
        )}
    </div>
  )
}

export default ConnectionList
