import { VEHICLE_TYPE_INITIAL_STATE, type VehicleType } from './vehicle-type.interface'

export interface Vehicle {
  id: string
  licensePlate: string
  provider: string
  company: string
  imei: string
  brand: string
  model: string
  lastMaintenance: string
  soatExpiration: string
  technicalReviewExpiration: string
  vehicleType: VehicleType

  createdAt: string
  updatedAt: string
  active: boolean
}

export interface VehicleDto extends Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'active' | 'companies' | 'vehicleType'> {
  vehicleTypeId: string
}

export const VEHICLE_INITIAL_STATE: Vehicle = {
  id: '',
  createdAt: '',
  updatedAt: '',
  active: true,
  licensePlate: '',
  provider: '',
  company: '',
  imei: '',
  brand: '',
  model: '',
  lastMaintenance: '',
  soatExpiration: '',
  technicalReviewExpiration: '',
  vehicleType: VEHICLE_TYPE_INITIAL_STATE
}

export const VEHICLE_DTO_INITIAL_STATE: VehicleDto = {
  licensePlate: '',
  provider: '',
  company: '',
  brand: '',
  imei: '',
  model: '',
  lastMaintenance: new Date().toISOString(),
  soatExpiration: new Date().toISOString(),
  technicalReviewExpiration: new Date().toISOString(),
  vehicleTypeId: ''
}
