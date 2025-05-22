import { JSX } from 'react'
import { EventCallback, IBranchProps, INode, LeafProps } from 'react-accessible-treeview'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import { FaDatabase, FaTableCells } from 'react-icons/fa6'

interface Props {
  element: INode<IFlatMetadata>
  getNodeProps: (args?: { onClick?: EventCallback }) => IBranchProps | LeafProps
  level: number
}

function PlaygroundSidebarItem({ element, getNodeProps, level }: Props): JSX.Element {
  return (
    <div
      {...getNodeProps()}
      tabIndex={-1}
      style={{ paddingLeft: 20 * (level - 1) }}
      className="flex items-center justify-between gap-2 mb-2"
    >
      <div className="w-full hover:bg-default-200 py-2.5 px-5 rounded-xl cursor-pointer flex items-center gap-2">
        {element.metadata && element.metadata.type === 'database' && (
          <FaDatabase className="w-4 h-4" />
        )}
        {element.metadata && element.metadata.type === 'table' && (
          <FaTableCells className="w-4 h-4" />
        )}
        <span className="text-base font-normal">{element.name}</span>
      </div>
      <div></div>
    </div>
  )
}

export default PlaygroundSidebarItem
