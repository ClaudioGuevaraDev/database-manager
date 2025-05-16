import { Button, useDisclosure } from '@heroui/react'
import { Connection } from '@renderer/interfaces/connection'
import { JSX } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { TbDatabasePlus } from 'react-icons/tb'

import SettingsModal from '../general/SettingsModal'
import EngineDatabaseForm from './EngineDatabaseForm'

interface Props {
  connections: Connection[]
  setConnections: (value: Connection[]) => void
}

function HomeMenu({ connections, setConnections }: Props): JSX.Element {
  const {
    isOpen: isOpenEngineDatabaseForm,
    onOpen: onOpenEngineDatabaseForm,
    onOpenChange: onOpenChangeEngineDatabaseForm,
    onClose: onCloseEngineDatabaseForm
  } = useDisclosure({ defaultOpen: connections.length === 0 })

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div>
          <Button
            color="primary"
            startContent={<TbDatabasePlus className="w-5 h-5" />}
            onPress={onOpenEngineDatabaseForm}
          >
            Añadir conexión
          </Button>
        </div>

        <div>
          <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
            <IoMdSettings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <EngineDatabaseForm
        isOpen={isOpenEngineDatabaseForm}
        onOpenChange={onOpenChangeEngineDatabaseForm}
        onClose={onCloseEngineDatabaseForm}
        connections={connections}
        setConnections={setConnections}
      />

      <SettingsModal
        isOpen={isOpenSettings}
        onOpenChange={onOpenChangeSettings}
        onClose={onCloseSettings}
      />
    </>
  )
}

export default HomeMenu
