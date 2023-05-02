import { type VehicleType } from '@/vehicles/models/vehicle-type.interface'

export interface ReportType {
  id: string
  name: string
  vehicleTypes: VehicleType[]

  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ReportTypeDto extends Pick<ReportType, 'name'> {}

export const REPORT_TYPE_INITIAL_STATE: ReportType = {
  createdAt: '',
  updatedAt: '',
  id: '',
  name: '',
  active: false,
  vehicleTypes: []
}

export const REPORT_TYPE_DTO_INITIAL_STATE: ReportTypeDto = {
  name: ''
}
