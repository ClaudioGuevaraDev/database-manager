import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch
} from '@heroui/react'
import useHandleBaseForm from '@renderer/hooks/useHandleBaseForm'
import { Connection, ConnectionForm, Engine, engines } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import MySQLSvg from '@renderer/svgs/MySQLSvg'
import PostgreSQLSvg from '@renderer/svgs/PostgreSQLSvg'
import { FormEvent, JSX, ReactNode, useState } from 'react'
import { BsDatabaseCheck } from 'react-icons/bs'
import { BsEyeFill } from 'react-icons/bs'
import { FaSave } from 'react-icons/fa'
import { HiMiniEyeSlash } from 'react-icons/hi2'
import { IoExitOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

const initialConnectionForm: ConnectionForm = {
  name: '',
  engine: new Set([engines[0]]),
  database: '',
  host: '',
  password: '',
  port: '',
  ssl: false,
  username: ''
}

type FormAction = 'save' | 'test'

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  onClose: () => void
  edit: boolean
  baseForm?: ConnectionForm
  connectionID?: string
}

function EngineDatabaseForm({
  isOpen,
  onOpenChange,
  onClose,
  edit,
  baseForm,
  connectionID
}: Props): JSX.Element {
  const [form, setForm] = useState<ConnectionForm>(
    edit && baseForm ? baseForm : initialConnectionForm
  )
  const [action, setAction] = useState<FormAction | undefined>(undefined)
  const [showPort, setShowPort] = useState(false)

  const { connections, handleConnections } = useConnectionsStore()

  useHandleBaseForm({ baseForm: baseForm, edit: edit, setForm: setForm })

  const selectedEngine = Array.from(form.engine)[0] as Engine

  const renderEngineSvg = (engine: Engine): ReactNode => {
    switch (engine) {
      case 'PostgreSQL':
        return <PostgreSQLSvg width={24} height={24} />
      case 'MySQL':
        return <MySQLSvg width={24} height={24} />
      default:
        return null
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (action === 'save') {
      let connections = localStorage.getItem('connections')

      if (connections == null) {
        localStorage.setItem('connections', JSON.stringify([]))
        connections = '[]'
      }

      const connectionsParsed = JSON.parse(connections) as Connection[]

      let newConnections: Connection[] = []

      if (edit && baseForm) {
        newConnections = connectionsParsed.map((connection) =>
          connection.id === connectionID
            ? {
                ...form,
                id: connectionID,
                engine: selectedEngine
              }
            : connection
        )
      } else {
        newConnections = [
          {
            ...form,
            id: uuidv4(),
            engine: selectedEngine
          },
          ...connectionsParsed
        ]
      }

      try {
        localStorage.setItem('connections', JSON.stringify(newConnections))
        handleConnections(newConnections)
        setForm(initialConnectionForm)
        onClose()
      } catch (error) {
        console.error(error)
        toast.error('Error al guardar la conexión')
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      hideCloseButton={connections.length === 0}
      isDismissable={connections.length !== 0}
      isKeyboardDismissDisabled={connections.length === 0}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-xl">{edit ? 'Editar' : 'Crear nueva'} conexión</ModalHeader>
          <Divider className="mb-2" />
          <ModalBody>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nombre de la conexión"
                isRequired
                value={form.name}
                onValueChange={(value) => setForm({ ...form, name: value })}
              />
              <Select
                label="Motor de base de datos"
                selectedKeys={form.engine}
                onSelectionChange={(value) => setForm({ ...form, engine: value })}
                startContent={renderEngineSvg(Array.from(form.engine)[0] as Engine)}
              >
                {engines.map((engine) => (
                  <SelectItem key={engine} startContent={renderEngineSvg(engine)}>
                    {engine}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Host"
                placeholder="127.0.0.1"
                isRequired
                value={form.host}
                onValueChange={(value) => setForm({ ...form, host: value })}
              />
              <Input
                label="Puerto"
                placeholder={
                  selectedEngine === 'MySQL'
                    ? '3306'
                    : selectedEngine === 'PostgreSQL'
                      ? '5432'
                      : ''
                }
                isRequired
                value={form.port}
                onValueChange={(value) => setForm({ ...form, port: value })}
              />
              <Input
                label="Usuario"
                placeholder={
                  selectedEngine === 'MySQL'
                    ? 'root'
                    : selectedEngine === 'PostgreSQL'
                      ? 'postgres'
                      : ''
                }
                isRequired
                value={form.username}
                onValueChange={(value) => setForm({ ...form, username: value })}
              />
              <Input
                label="Contraseña"
                placeholder="********"
                type={showPort ? 'text' : 'password'}
                isRequired
                value={form.password}
                onValueChange={(value) => setForm({ ...form, password: value })}
                endContent={
                  showPort ? (
                    <HiMiniEyeSlash
                      className="w-6 h-6 cursor-default"
                      onClick={() => setShowPort(false)}
                    />
                  ) : (
                    <BsEyeFill
                      className="w-6 h-6 cursor-default"
                      onClick={() => setShowPort(true)}
                    />
                  )
                }
              />
              <Input
                label="Base de datos"
                value={form.database}
                onValueChange={(value) => setForm({ ...form, database: value })}
              />
            </div>

            <Switch size="sm">SSL</Switch>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              startContent={<FaSave className="w-5 h-5" />}
              onPress={() => setAction('save')}
            >
              Guardar
            </Button>
            <Button
              color="success"
              type="submit"
              startContent={<BsDatabaseCheck className="w-5 h-5" />}
              onPress={() => setAction('test')}
            >
              Probar
            </Button>
            {connections.length > 0 && (
              <Button onPress={onClose} startContent={<IoExitOutline className="w-5 h-5" />}>
                Cerrar
              </Button>
            )}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EngineDatabaseForm
