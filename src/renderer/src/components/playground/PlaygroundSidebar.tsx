import { Button, Divider, useDisclosure } from '@heroui/react'
import { Tree } from '@renderer/interfaces/playground'
import { JSX, useState } from 'react'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import { IoMdSettings } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'

import SettingsModal from '../general/SettingsModal'
import PlaygroundSidebarItem from './PlaygroundSidebarItem'

function PlaygroundSidebar(): JSX.Element {
  const [tree, setTree] = useState<Tree>({
    name: '',
    metadata: { id: uuidv4(), type: '', active: false },
    children: [
      {
        name: 'Base de datos 1',
        metadata: {
          id: uuidv4(),
          type: 'database',
          active: false
        },
        children: [
          {
            name: 'usuarios',
            metadata: { id: uuidv4(), type: 'table', active: false },
            children: []
          },
          {
            name: 'animales',
            metadata: { id: uuidv4(), type: 'table', active: false },
            children: []
          }
        ]
      }
    ]
  })

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  const data = flattenTree(tree)

  return (
    <>
      <div className="flex justify-between h-full flex-col border-r dark:border-default-200">
        <div className="h-full">
          <TreeView
            className="pt-3 px-1.5"
            data={data}
            nodeRenderer={({ element, getNodeProps, level, handleExpand }) => (
              <PlaygroundSidebarItem
                element={element}
                getNodeProps={getNodeProps}
                level={level}
                tree={tree}
                setTree={setTree}
                handleExpand={handleExpand}
              />
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
