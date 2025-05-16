import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'
import { Connection } from '@renderer/interfaces/connection'
import PostgreSQLSvg from '@renderer/svgs/PostgreSQLSvg'
import { JSX } from 'react'
import { TbDatabaseEdit, TbDatabaseImport, TbDatabaseX } from 'react-icons/tb'

interface Props {
  connection: Connection
}

function ConnectionCard({ connection }: Props): JSX.Element {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <PostgreSQLSvg width={40} height={40} />
        <p className="text-md truncate">{connection.name}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Host</p>
            <span className="text-lg">{connection.host}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Puerto</p>
            <span className="text-lg">{connection.port}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Usuario</p>
            <span className="text-lg">{connection.username}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Contraseña</p>
            <span className="text-lg">{connection.password.replace(/.(?=.{2})/g, '*')}</span>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-2">
        <Button color="primary" startContent={<TbDatabaseImport className="w-6 h-6" />}>
          Conectar
        </Button>
        <Button color="warning" startContent={<TbDatabaseEdit className="w-6 h-6" />}>
          Editar
        </Button>
        <Button color="danger" startContent={<TbDatabaseX className="w-6 h-6" />}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ConnectionCard
