import { FIELD_INITIAL_STATE, type Field } from './field.interface'

export interface GroupField {
  id: string
  fieldId: string
  groupId: string
  field: Field
  maxLength: number
  isCritical: boolean
  needImage: boolean
}

export interface GroupFieldDto extends Omit<GroupField, 'id' | 'field' > {}

export const GROUP_FIELD_INITIAL_STATE: GroupField = {
  id: '',
  maxLength: 0,
  isCritical: false,
  needImage: false,
  fieldId: '',
  groupId: '',
  field: FIELD_INITIAL_STATE
}

export const GROUP_FIELD_DTO_INITIAL_STATE: GroupFieldDto = {
  maxLength: 0,
  isCritical: false,
  needImage: false,
  fieldId: '',
  groupId: ''
}
