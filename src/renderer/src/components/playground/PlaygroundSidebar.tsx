import { Button, Divider, useDisclosure } from '@heroui/react'
import { JSX } from 'react'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import { IoMdSettings } from 'react-icons/io'

import SettingsModal from '../general/SettingsModal'
import PlaygroundSidebarItem from './PlaygroundSidebarItem'

function PlaygroundSidebar(): JSX.Element {
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  const data = flattenTree({
    name: '',
    children: [
      {
        name: 'Base de datos 1',
        metadata: {
          type: 'database'
        },
        children: [
          { name: 'usuarios', metadata: { type: 'table' } },
          { name: 'animales', metadata: { type: 'table' } }
        ]
      }
    ]
  })

  return (
    <>
      <div className="flex justify-between h-full flex-col border-r dark:border-default-200">
        <div className="h-full">
          <TreeView
            className="pt-3 pl-3"
            data={data}
            nodeRenderer={({ element, getNodeProps, level }) => (
              <PlaygroundSidebarItem element={element} getNodeProps={getNodeProps} level={level} />
            )}
          />
        </div>
        <Divider />
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
