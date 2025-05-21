import { Button, useDisclosure } from '@heroui/react'
import { JSX } from 'react'
import { IoMdSettings } from 'react-icons/io'

import SettingsModal from '../general/SettingsModal'

function PlaygroundSidebar(): JSX.Element {
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  return (
    <>
      <div className="flex justify-between h-full flex-col">
        <div className="h-full">Bases de datos y las tablas</div>
        <div className="p-3 flex items-center justify-center gap-2">
          <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
            <IoMdSettings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <SettingsModal
        isOpen={isOpenSettings}
        onOpenChange={onOpenChangeSettings}
        onClose={onCloseSettings}
      />
    </>
  )
}

export default PlaygroundSidebar
