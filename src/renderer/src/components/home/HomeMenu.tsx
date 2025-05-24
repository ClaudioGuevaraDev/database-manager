import { Button, Input, Select, SelectItem, useDisclosure } from '@heroui/react'
import useInitialEngineForm from '@renderer/hooks/home/useInitialEngineForm'
import { Engine, engines } from '@renderer/interfaces/connection'
import { useConnectionsStore } from '@renderer/store/connectionsStore'
import MySQLSvg from '@renderer/svgs/MySQLSvg'
import PostgreSQLSvg from '@renderer/svgs/PostgreSQLSvg'
import { ReactNode } from '@tanstack/react-router'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdSettings } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TbDatabasePlus } from 'react-icons/tb'

import SettingsModal from '../general/SettingsModal'
import EngineDatabaseForm from './EngineDatabaseForm'

interface Props {
  isPlayground: boolean
}

function HomeMenu({ isPlayground }: Props): JSX.Element {
  const { searchConnection, selectedEngines, handleSearchConnection, handleSelectedEngines } =
    useConnectionsStore()

  const { t } = useTranslation()

  const {
    isOpen: isOpenEngineDatabaseForm,
    onOpen: onOpenEngineDatabaseForm,
    onOpenChange: onOpenChangeEngineDatabaseForm,
    onClose: onCloseEngineDatabaseForm
  } = useDisclosure()

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
    onClose: onCloseSettings
  } = useDisclosure()

  useInitialEngineForm({ onOpenChangeEngineDatabaseForm })

  const renderEngineSvg = (engine: Engine): ReactNode => {
    switch (engine) {
      case 'PostgreSQL':
        return <PostgreSQLSvg width={24} height={24} />
      case 'MySQL':
        return <MySQLSvg width={24} height={24} />
      default:
        return null
    }
  }

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {!isPlayground && (
            <Button
              color="primary"
              size="md"
              className="w-full max-w-40"
              startContent={<TbDatabasePlus className="w-5 h-5" />}
              onPress={onOpenEngineDatabaseForm}
            >
              {t('home.menu.add_connection')}
            </Button>
          )}

          <Input
            placeholder={t('home.menu.search_connection')}
            size="md"
            className="w-72"
            startContent={<IoSearch className="w-5 h-5" />}
            value={searchConnection}
            onValueChange={handleSearchConnection}
          />

          <Select
            aria-label="engines"
            className="w-44"
            selectionMode="multiple"
            selectedKeys={selectedEngines}
            onSelectionChange={handleSelectedEngines}
          >
            {engines.map((engine) => (
              <SelectItem key={engine} startContent={renderEngineSvg(engine)}>
                {engine}
              </SelectItem>
            ))}
          </Select>
        </div>

        {!isPlayground && (
          <div>
            <Button isIconOnly variant="bordered" onPress={onOpenSettings}>
              <IoMdSettings className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <EngineDatabaseForm
        isOpen={isOpenEngineDatabaseForm}
        onOpenChange={onOpenChangeEngineDatabaseForm}
        onClose={onCloseEngineDatabaseForm}
        edit={false}
      />

      <SettingsModal
        isOpen={isOpenSettings}
        onOpenChange={onOpenChangeSettings}
        onClose={onCloseSettings}
      />
    </>
  )
}

export default HomeMenu
