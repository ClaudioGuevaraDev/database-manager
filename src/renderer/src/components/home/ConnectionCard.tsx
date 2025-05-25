import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/react'
import { Connection } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import MySQLSvg from '@renderer/svgs/MySQLSvg'
import PostgreSQLSvg from '@renderer/svgs/PostgreSQLSvg'
import { useNavigate } from '@tanstack/react-router'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { IoExitOutline } from 'react-icons/io5'
import { TbDatabaseEdit, TbDatabaseImport, TbDatabaseX } from 'react-icons/tb'

import EngineDatabaseForm from './EngineDatabaseForm'

interface Props {
  connection: Connection
  isPlayground: boolean
}

function ConnectionCard({ connection, isPlayground }: Props): JSX.Element {
  const navigate = useNavigate()

  const { handleConnections } = useConnectionsStore()
  const { t } = useTranslation()
  const {
    isOpen: isOpenDeleteConnection,
    onOpen: onOpenDeleteConnection,
    onOpenChange: onOpenChangeDeleteConnection,
    onClose: onCloseDeleteConnection
  } = useDisclosure()
  const {
    isOpen: isOpenEngineDatabaseForm,
    onOpen: onOpenEngineDatabaseForm,
    onOpenChange: onOpenChangeEngineDatabaseForm,
    onClose: onCloseEngineDatabaseForm
  } = useDisclosure()

  const handleDeleteConnection = (): void => {
    const connections = localStorage.getItem('connections')

    if (connections == null) {
      return
    }

    try {
      const connectionsParsed = JSON.parse(connections) as Connection[]

      const filterConnections = connectionsParsed.filter(({ id }) => id !== connection.id)

      localStorage.setItem('connections', JSON.stringify(filterConnections))

      handleConnections(filterConnections)
    } catch (error) {
      console.error(error)
      addToast({ title: t('home.list.connection_delete_error'), color: 'danger' })
    }
  }

  const handleRedirectPlayground = (): void => {
    const connectionsStore = localStorage.getItem('connections')

    if (connectionsStore == null) {
      return
    }

    const parsedConnections = JSON.parse(connectionsStore) as Connection[]

    const sortedConnections = parsedConnections
      .filter((connection) => connection.active)
      .sort((a, b) => a.position - b.position)

    let position = 1
    if (sortedConnections.length > 0) {
      position = sortedConnections[sortedConnections.length - 1].position + 1
    }

    const newConnections = parsedConnections.map((parsedConnection) =>
      parsedConnection.id === connection.id
        ? { ...parsedConnection, active: true, position: position }
        : parsedConnection
    )

    handleConnections(newConnections)
    localStorage.setItem('connections', JSON.stringify(newConnections))

    navigate({ to: '/playground', search: { id: connection.id } })
  }

  return (
    <>
      <Card>
        <CardHeader className="flex gap-3">
          {connection.engine === 'PostgreSQL' && <PostgreSQLSvg width={40} height={40} />}
          {connection.engine === 'MySQL' && <MySQLSvg width={40} height={40} />}
          <p className="text-md truncate">{connection.name}</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold">{t('home.list.host')}</p>
              <span className="text-lg">{connection.host}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{t('home.list.port')}</p>
              <span className="text-lg">{connection.port}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{t('home.list.username')}</p>
              <span className="text-lg">{connection.username}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{t('home.list.password')}</p>
              <span className="text-lg">{connection.password.replace(/.(?=.{0})/g, '*')}</span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between gap-2">
          <Button
            color="primary"
            startContent={<TbDatabaseImport className="w-6 h-6" />}
            onPress={handleRedirectPlayground}
          >
            {t('home.list.connect')}
          </Button>
          {!isPlayground && (
            <Button
              color="warning"
              startContent={<TbDatabaseEdit className="w-6 h-6" />}
              onPress={onOpenEngineDatabaseForm}
            >
              {t('home.list.edit')}
            </Button>
          )}
          {!isPlayground && (
            <Button
              color="danger"
              startContent={<TbDatabaseX className="w-6 h-6" />}
              onPress={onOpenDeleteConnection}
            >
              {t('home.list.delete')}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Modal isOpen={isOpenDeleteConnection} onOpenChange={onOpenChangeDeleteConnection}>
        <ModalContent>
          <ModalHeader className="text-xl">
            <p className="truncate">
              {t('home.list.delete_connection')} {connection.name}
            </p>
          </ModalHeader>
          <Divider />
          <ModalFooter>
            <Button
              color="danger"
              startContent={<TbDatabaseX className="w-5 h-5" />}
              onPress={handleDeleteConnection}
            >
              {t('home.list.delete')}
            </Button>
            <Button
              onPress={onCloseDeleteConnection}
              startContent={<IoExitOutline className="w-5 h-5" />}
            >
              {t('home.list.close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <EngineDatabaseForm
        edit={true}
        isOpen={isOpenEngineDatabaseForm}
        onOpenChange={onOpenChangeEngineDatabaseForm}
        onClose={onCloseEngineDatabaseForm}
        baseForm={{
          database: connection.database,
          host: connection.host,
          name: connection.name,
          password: connection.password,
          port: connection.port,
          ssl: connection.ssl,
          username: connection.username,
          engine: new Set([connection.engine])
        }}
        connectionID={connection.id}
      />
    </>
  )
}

export default ConnectionCard
