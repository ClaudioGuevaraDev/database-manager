import { ConnectionForm } from '@renderer/interfaces/connection'
import { useEffect } from 'react'

interface Props {
  edit: boolean
  baseForm?: ConnectionForm
  setForm: (value: ConnectionForm) => void
}

export default function useHandleBaseForm({ baseForm, edit, setForm }: Props): void {
  useEffect(() => {
    if (edit && baseForm) {
      setForm(baseForm)
    }
  }, [baseForm])

  return
}
