import { Tree } from '@renderer/interfaces/playground'
import { JSX, useState } from 'react'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import { v4 as uuidv4 } from 'uuid'

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

  const data = flattenTree(tree)

  return (
    <div className="flex justify-between h-full flex-col border-r border-gray-200 dark:border-default-100">
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
    </div>
  )
}

export default PlaygroundSidebar
