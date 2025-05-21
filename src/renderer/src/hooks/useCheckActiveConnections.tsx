import { Connection } from '@renderer/interfaces/connection'
import { useEffect, useState } from 'react'

function useCheckActiveConnections(): { checking: boolean } {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const connections = localStorage.getItem('connections')

    if (connections == null) {
      setChecking(false)
      return
    }

    const parsedConnections = JSON.parse(connections) as Connection[]

    const checkActiveConnections = parsedConnections.some((connection) => connection.active)

    if (checkActiveConnections) {
      setChecking(false)
    } else {
      setChecking(false)
    }
  }, [])

  return { checking: checking }
}

export default useCheckActiveConnections
