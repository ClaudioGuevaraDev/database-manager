import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
  Switch
} from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import { useSettingsStore } from '@renderer/store/settingsStore'
import { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaMoon } from 'react-icons/fa'
import { IoMdSunny } from 'react-icons/io'
import { IoExitOutline } from 'react-icons/io5'

interface Props {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  onClose: () => void
}

function SettingsModal({ isOpen, onOpenChange, onClose }: Props): JSX.Element {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const { handleMode } = useSettingsStore()

  const [language, setLanguage] = useState<Selection>(new Set([i18n.language]))

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-xl">{t('settings.title')}</ModalHeader>
        <Divider className="mb-2" />
        <ModalBody className="space-y-2">
          <div className="space-y-2">
            <p className="font-medium text-base">{t('settings.language')}</p>
            <Select
              aria-label="language"
              className="max-w-44"
              selectedKeys={language}
              onSelectionChange={(value) => {
                setLanguage(value)
                i18n.changeLanguage(value as string)
              }}
            >
              <SelectItem key="en">{t('settings.languages.english')}</SelectItem>
              <SelectItem key="es">{t('settings.languages.spanish')}</SelectItem>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-base">{t('settings.dark_mode')}</p>
            <Switch
              size="lg"
              color="secondary"
              startContent={<FaMoon />}
              endContent={<IoMdSunny />}
              isSelected={theme === 'dark'}
              onValueChange={() => {
                if (theme === 'dark') {
                  setTheme('light')
                  handleMode('light')
                } else {
                  setTheme('dark')
                  handleMode('dark')
                }
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} startContent={<IoExitOutline className="w-5 h-5" />}>
            {t('settings.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
