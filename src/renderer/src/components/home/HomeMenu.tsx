import { Button, useDisclosure } from '@heroui/react'
import useInitialEngineForm from '@renderer/hooks/useInitialEngineForm'
import { JSX } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { TbDatabasePlus } from 'react-icons/tb'

import SettingsModal from '../general/SettingsModal'
import EngineDatabaseForm from './EngineDatabaseForm'

function HomeMenu(): JSX.Element {
  const {
    isOpen: isOpenEngineDatabaseForm,
    onOpen: onOpenEngineDatabaseForm,
    onOpenChange: onOpenChangeEngineDatabaseForm,
    onClose: onCloseEngineDatabaseForm
  } = useDisclosure()

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  useInitialEngineForm({ onOpenChangeEngineDatabaseForm })

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
        edit={false}
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
