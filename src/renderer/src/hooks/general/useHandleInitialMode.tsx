import { useTheme } from '@heroui/use-theme'
import { useSettingsStore } from '@renderer/store/settingsStore'
import { useEffect } from 'react'

function useHandleInitialMode(): void {
  const { theme } = useTheme()
  const { handleMode } = useSettingsStore()

  useEffect(() => {
    handleMode(theme)
  }, [])

  return
}

export default useHandleInitialMode
