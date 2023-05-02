import React, { type ReactElement, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '@/shared/ui/components/Button'
import { type Group } from '@/fields/models/group.interface'
import { ReportTypeContext } from '../../../reports/ui/contexts/ReportTypeContext'
import { GroupsService } from '@/reports/services/groups.service'
import { type GroupFieldDto, type GroupField, GROUP_FIELD_DTO_INITIAL_STATE } from '@/fields/models/group-field.interface'
import { useDataForm } from '@/shared/hooks/useDataForm'
import Input from '@/shared/ui/components/Input'

interface UpdateFieldFormProps {
  group: Group
  selectedGroupField: GroupField
  onClose: () => void
  onSuccess: (reportTypeField: GroupField) => void
}

const UpdateFieldForm = ({ group, selectedGroupField, onClose, onSuccess }: UpdateFieldFormProps): ReactElement => {
  const { toastId } = useContext(ReportTypeContext)

  const [groupField, setGroupFieldValue, setGroupField] = useDataForm<GroupFieldDto>(GROUP_FIELD_DTO_INITIAL_STATE)

  useEffect(() => {
    const { fieldId, groupId, isCritical, maxLength, needImage } = selectedGroupField

    setGroupField({
      fieldId,
      groupId,
      isCritical,
      maxLength,
      needImage
    })
  }, [selectedGroupField])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const groupsService = new GroupsService()

    const fieldId = groupField ? groupField.fieldId : ''
    void groupsService.updateField(group.id, fieldId, groupField)
      .then((response) => {
        onSuccess(response)
        toast('Campo actualizado correctamente', { toastId, type: 'success' })
      })
      .catch((error) => {
        const { message } = error.data
        toast(message, { toastId, type: 'error' })
      })
      .finally(() => {
        onClose()
      })
  }

  return (
    <div>
      <h2 className='text-center font-bold uppercase text-xl'>Editar campo</h2>
      <p className='font-medium text-red-dark text-center uppercase'>Campo: {selectedGroupField?.field.name}</p>
      <form onSubmit={handleSubmit}>
        {selectedGroupField?.field.type === 'text' && (
          <Input
            label='Max cantidad de caracteres'
            name='maxLength'
            placeholder='Max caracteres'
            setValue={setGroupFieldValue}
            type='number'
            value={groupField.maxLength.toString()}
          />
        )}
        <div className='grid grid-cols-2 place-items-center'>
          <Input
            label='Es crítico'
            name='isCritical'
            placeholder='Es crítico'
            setValue={setGroupFieldValue}
            type='checkbox'
            value={groupField.isCritical.toString()}
          />
          <Input
            label='Imagen'
            name='needImage'
            placeholder='Imagen'
            setValue={setGroupFieldValue}
            type='checkbox'
            value={groupField.needImage.toString()}
          />
        </div>

        <div className='mt-5 flex justify-center gap-3 items-center'>
          <Button color='primary' type='submit'>Guardar</Button>
          <Button color='secondary' onClick={onClose}>Cerrar</Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFieldForm
