import { type Report } from '@/reports/models/report.interface'
import { type Vehicle } from '../../vehicles/models/vehicle.interface'
import { type RouteProfile } from '@/profiles/models/route-profile.interface'

export interface Route {
  id: string
  startLocation: string
  endLocation: string
  materialType: string
  materialAmount: string
  pernocteLocation: string | null
  startPernocte: string | null
  endPernocte: string | null
  copilotFullName: string | null
  supervisorFullName: string | null
  name: string
  code: string
  checked: boolean
  doubleLicensePlate: boolean
  isFull: boolean
  vehicles: Vehicle[]
  reports: Report[]
  routeProfiles: RouteProfile[]

  createdAt: string
  updatedAt: string
  active: boolean
}

export const ROUTE_INITIAL_STATE: Route = {
  id: '',
  createdAt: '',
  updatedAt: '',
  startLocation: '',
  endLocation: '',
  materialType: '',
  name: '',
  code: '',
  checked: false,
  doubleLicensePlate: false,
  isFull: false,
  active: true,
  vehicles: [],
  reports: [],
  routeProfiles: [],
  materialAmount: '',
  pernocteLocation: null,
  startPernocte: null,
  endPernocte: null,
  copilotFullName: null,
  supervisorFullName: null
}
