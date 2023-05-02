import { type Vehicle } from '@/vehicles/models/vehicle.interface'
import { type User } from '@/users/models/user.interface'

export interface ExcelResponse {
  data: User[] | Vehicle[]
  dataMissed: string[]
}
