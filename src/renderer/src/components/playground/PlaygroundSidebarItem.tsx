import { Tree } from '@renderer/interfaces/playground'
import { JSX, useEffect, useState } from 'react'
import { EventCallback, IBranchProps, INode, LeafProps } from 'react-accessible-treeview'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import { FaDatabase, FaTableCells } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface Props {
  element: INode<IFlatMetadata>
  getNodeProps: (args?: { onClick?: EventCallback }) => IBranchProps | LeafProps
  level: number
  tree: Tree
  setTree: (value: Tree) => void
  handleExpand: EventCallback
}

function PlaygroundSidebarItem({
  element,
  getNodeProps,
  level,
  tree,
  setTree,
  handleExpand
}: Props): JSX.Element {
  const [node, setNode] = useState<Tree | undefined>(undefined)

  const elementID = (element.metadata ? element.metadata.id : undefined) as string | undefined

  const findTreeElement = (node: Tree): void => {
    if (node.metadata.id === elementID) {
      setNode(node)
      return
    }

    node.children.map((children) => findTreeElement(children))
    return
  }

  useEffect(() => {
    findTreeElement(tree)
  }, [tree])

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
    setTree(updatedTree)
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
      className="flex items-center justify-between gap-2 mb-2 w-full hover:bg-default-200 py-2.5 rounded-xl cursor-pointer"
    >
      <div className="flex items-center gap-2 overflow-hidden w-full px-1.5">
        {node?.metadata?.type === 'database' &&
          (node.metadata.active ? (
            <IoIosArrowDown className="w-5 h-5 shrink-0" />
          ) : (
            <IoIosArrowForward className="w-5 h-5 shrink-0" />
          ))}

        {element.metadata?.type === 'database' && <FaDatabase className="w-4 h-4 shrink-0" />}
        {element.metadata?.type === 'table' && <FaTableCells className="w-4 h-4 shrink-0" />}

        <span className="text-base font-normal truncate flex-1">{element.name}</span>
      </div>
    </div>
  )
}

export default PlaygroundSidebarItem
