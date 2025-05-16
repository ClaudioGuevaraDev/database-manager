import { Connection } from '@renderer/interfaces/connection'
import { useEffect } from 'react'

interface Props {
  setConnections: (value: Connection[]) => void
}

function useGetConnections({ setConnections }: Props): void {
  useEffect(() => {
    const connectionsStore = localStorage.getItem('connections')

    if (connectionsStore != null) {
      setConnections(JSON.parse(connectionsStore))
    } else {
      setConnections([])
    }
  }, [setConnections])

  return
}

export default useGetConnections
