import { useSettingsStore } from '@renderer/store/settingsStore'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function useHandleInitialLanguage(): void {
  const { handleLanguage } = useSettingsStore()
  const { i18n } = useTranslation()

  useEffect(() => {
    handleLanguage(new Set([i18n.language]))
  }, [])

  return
}

export default useHandleInitialLanguage
