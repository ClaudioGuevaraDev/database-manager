import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch
} from '@heroui/react'
import { useTheme } from '@heroui/use-theme'
import { JSX } from 'react'
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

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-xl">Configuraciones</ModalHeader>
        <Divider className="mb-2" />
        <ModalBody className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium text-base">Modo oscuro</p>
            <Switch
              size="lg"
              color="secondary"
              startContent={<FaMoon />}
              endContent={<IoMdSunny />}
              isSelected={theme === 'dark'}
              onValueChange={() => {
                if (theme === 'dark') {
                  setTheme('light')
                } else {
                  setTheme('dark')
                }
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} startContent={<IoExitOutline className="w-5 h-5" />}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
