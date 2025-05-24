import { Tree } from '@renderer/interfaces/playground'
import { useEffect } from 'react'

interface Props {
  elementID: string | undefined
  tree: Tree
  setNode: (value: Tree) => void
}

function useFindTreeElement({ elementID, tree, setNode }: Props): void {
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

  return
}

export default useFindTreeElement
