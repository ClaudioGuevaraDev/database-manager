import { Tree } from '@renderer/interfaces/playground'
import { useDatabasesTreeStore } from '@renderer/store/useDatabasesTreeStore'
import { JSX } from 'react'
import { EventCallback, IBranchProps, INode, LeafProps } from 'react-accessible-treeview'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import { FaDatabase, FaTableCells } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface Props {
  element: INode<IFlatMetadata>
  getNodeProps: (args?: { onClick?: EventCallback }) => IBranchProps | LeafProps
  level: number
  tree: Tree
  handleExpand: EventCallback
  selectedConnection: string | number | undefined
}

function PlaygroundSidebarItem({
  element,
  getNodeProps,
  level,
  tree,
  handleExpand,
  selectedConnection
}: Props): JSX.Element {
  const elementID = (element.metadata ? element.metadata.id : undefined) as string | undefined

  const { databasesTree, handleDatabasesTree } = useDatabasesTreeStore()

  const toggleActiveById = (tree: Tree, elementID: string): Tree => {
    const toggle = (node: Tree): Tree => {
      const isMatch = node.metadata.id === elementID

      return {
        ...node,
        metadata: {
          ...node.metadata,
          active: isMatch ? !node.metadata.active : node.metadata.active
        },
        children: node.children.map(toggle)
      }
    }

    return toggle(tree)
  }

  const handleActiveNode = (): void => {
    if (elementID == null) {
      return
    }

    const updatedTree = toggleActiveById(tree, elementID)

    const newDatabasesTree = databasesTree.map((databaseTree) => {
      if (databaseTree.connectionID === selectedConnection) {
        return {
          ...databaseTree,
          tree: updatedTree
        }
      } else {
        return databaseTree
      }
    })

    handleDatabasesTree(newDatabasesTree)
  }

  return (
    <div
      {...getNodeProps({
        onClick: (event) => {
          handleExpand(event)
          handleActiveNode()
        }
      })}
      tabIndex={-1}
      style={{ paddingLeft: 40 * (level - 1) }}
      className="mb-2 flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-xl py-2.5 hover:bg-default-200"
    >
      <div className="flex w-full items-center gap-2 px-1.5">
        {element.metadata &&
          element.metadata.type === 'database' &&
          (element.metadata.active ? (
            <IoIosArrowDown className="h-5 w-5 shrink-0" />
          ) : (
            <IoIosArrowForward className="h-5 w-5 shrink-0" />
          ))}

        {element.metadata?.type === 'database' && <FaDatabase className="h-4 w-4 shrink-0" />}
        {element.metadata?.type === 'table' && <FaTableCells className="h-4 w-4 shrink-0" />}

        <span className="flex-1 truncate text-base font-normal">{element.name}</span>
      </div>
    </div>
  )
}

export default PlaygroundSidebarItem
