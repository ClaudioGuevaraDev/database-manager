import { Tree } from '@renderer/interfaces/playground'
import { JSX } from 'react'
import TreeView, { flattenTree } from 'react-accessible-treeview'

import PlaygroundSidebarItem from './PlaygroundSidebarItem'

interface Props {
  tree: Tree
  setTree: (value: Tree) => void
}

function PlaygroundSidebar({ tree, setTree }: Props): JSX.Element {
  const data = flattenTree(tree)

  return (
    <div className="flex h-full flex-col justify-between border-r border-gray-200 dark:border-default-100">
      <div className="h-full">
        <TreeView
          className="px-1.5 pt-2"
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
