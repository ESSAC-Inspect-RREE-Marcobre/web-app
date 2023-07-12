import React, { type ReactElement } from 'react'
import { type Route } from '@/routes/models/route.interface'
import Table from '@/shared/ui/components/table/Table'
import { goToGoogleMapsPage } from '../../utils/redirect-maps'
import Button from '@/shared/ui/components/Button'
import { useNavigate } from 'react-router-dom'
import { type Action, type Column } from '@/shared/ui/components/table/types'
import { formatDate, formatDateTime, formatTime } from '@/shared/utils'
import moment from 'moment'

interface RoutesTableProps {
  routes: Route[]
  showFilter: boolean
  setRoutesFiltered: (routes: Route[]) => void
}

const RoutesTable = ({ routes, showFilter, setRoutesFiltered }: RoutesTableProps): ReactElement => {
  const navigate = useNavigate()

  const ROUTE_COLUMNS: Array<Column<Route>> = [
    {
      id: 'code',
      columnName: 'Código Checklist',
      filterFunc: (route) => route.code,
      render: (route) => route.code,
      sortFunc: (a, b) => a.code > b.code ? 1 : -1
    },
    {
      id: 'name',
      columnName: 'Placa',
      filterFunc: (route) => route.name,
      render: (route) => route.name,
      sortFunc: (a, b) => a.name > b.name ? 1 : -1
    },
    {
      id: 'createdAt',
      columnName: 'Fecha de Creación',
      filterFunc: (route) => formatDate(route.createdAt),
      render: (route) => formatDate(route.createdAt),
      sortFunc: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      filterType: 'date'
    },
    {
      id: 'createdAtTime',
      columnName: 'Hora de Creación',
      filterFunc: (route) => formatTime(route.createdAt),
      render: (route) => formatTime(route.createdAt),
      sortFunc: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
    {
      id: 'company',
      columnName: 'Empresa de transporte',
      filterFunc: (route) => route.routeProfiles[0].profile.company,
      render: (route) => route.routeProfiles[0].profile.company,
      sortFunc: (a, b) => a.routeProfiles[0].profile.company > b.routeProfiles[0].profile.company ? 1 : -1
    },
    {
      id: 'driver',
      columnName: 'Conductor',
      render: (route) => {
        const driver = route.routeProfiles.find((routeProfile) => routeProfile.role === 'conductor')

        if (driver) {
          return `${driver.profile.name} ${driver.profile.lastName}`.toUpperCase()
        }

        return 'Sin conductor'
      },
      filterFunc: (route) => {
        const driver = route.routeProfiles.find((routeProfile) => routeProfile.role === 'conductor')

        if (driver) {
          return `${driver.profile.name} ${driver.profile.lastName}`
        }

        return 'Sin conductor'
      }
    },
    {
      id: 'copilot',
      columnName: 'Copiloto',
      render: (route) => {
        if (route.copilotFullName !== null && route.copilotFullName.length > 0) {
          return route.copilotFullName.toUpperCase()
        }

        const copilot = route.routeProfiles.find((routeProfile) => routeProfile.role === 'copiloto')

        if (copilot) {
          return `${copilot.profile.name} ${copilot.profile.lastName}`.toUpperCase()
        }

        return 'Sin copiloto'
      },
      filterFunc: (route) => {
        if (route.copilotFullName !== null && route.copilotFullName.length > 0) {
          return route.copilotFullName
        }

        const copilot = route.routeProfiles.find((routeProfile) => routeProfile.role === 'copiloto')

        if (copilot) {
          return `${copilot.profile.name} ${copilot.profile.lastName}`
        }

        return 'Sin copiloto'
      }
    },
    {
      id: 'vehicle',
      columnName: 'Unidad',
      render: (route) => {
        const vehicle = route.vehicles.find((vehicle) => !vehicle.vehicleType.isCart)

        if (vehicle) {
          return vehicle.licensePlate
        }

        return 'Sin unidad'
      },
      filterFunc: (route) => {
        const vehicle = route.vehicles.find((vehicle) => !vehicle.vehicleType.isCart)

        if (vehicle) {
          return vehicle.licensePlate
        }

        return 'Sin unidad'
      }
    },
    {
      id: 'startLocation',
      columnName: 'Ubicación de Inicio',
      filterFunc: (route) => route.startLocation,
      render: (route) => {
        return (
          <p
            className='hover:text-red cursor-pointer'
            onClick={() => { goToGoogleMapsPage(route.startLocation) }}
          >
            {route.startLocation}
          </p>
        )
      },
      sortFunc: (a, b) => a.startLocation > b.startLocation ? 1 : -1
    },
    {
      id: 'endLocation',
      columnName: 'Ubicación de Llegada',
      filterFunc: (route) => route.endLocation ?? 'No terminada',
      render: (route) => {
        if (route.endLocation === null) return 'No terminada'

        return (
          <p
            className='hover:text-red cursor-pointe'
            onClick={() => { goToGoogleMapsPage(route.endLocation) }}
          >
            {route.endLocation}
          </p>
        )
      },
      sortFunc: (a, b) => {
        const endLocationA = a.endLocation ?? 'No terminada'
        const endLocationB = b.endLocation ?? 'No terminada'

        return endLocationA > endLocationB ? 1 : -1
      }
    },
    {
      id: 'reportType',
      columnName: 'Tipo de reporte',
      filterFunc: (route) => route.reports[0].reportType.name,
      render: (route) => route.reports[0].reportType.name,
      sortFunc: (a, b) => a.reports[0].reportType.name > b.reports[0].reportType.name ? 1 : -1
    },
    {
      id: 'checkpoints',
      columnName: 'Supervisiones',
      filterFunc: (route) => route.reports[0].checkpoints.length.toString(),
      render: (route) => route.reports[0].checkpoints.length.toString(),
      sortFunc: (a, b) => a.reports[0].checkpoints.length > b.reports[0].checkpoints.length ? 1 : -1
    },
    {
      id: 'supervisors',
      columnName: 'Supervisores',
      filterFunc: (route) => route.reports[0].checkpoints.map(checkpoint => checkpoint.profile.name).join(' '),
      render: (route) => {
        const checkpoints = route.reports[0].checkpoints

        if (checkpoints.length <= 0) {
          return 'No hay superviciones'
        }

        const filteredArray = checkpoints.filter(
          (obj, index, self) => index === self.findIndex((o) => o.id === obj.id || o.profile.id === obj.profile.id)
        )

        return (
          <select className='block w-full h-10 px-2 rounded-t-md border-b border-solid border-blue-dark outline-none capitalize'>
            {
              ...filteredArray.map(({ profile }) => (
                <option key={profile.id}>{profile.name}</option>
              ))
            }
          </select>
        )
      }
    },
    {
      id: 'doubleLicensePlate',
      columnName: 'Doble Placa',
      filterFunc: (route) => route.doubleLicensePlate ? 'Sí' : 'No',
      render: (route) => route.doubleLicensePlate ? 'Sí' : 'No',
      sortFunc: (a, b) => {
        const doubleLicensePlateA = a.doubleLicensePlate ? 'Sí' : 'No'
        const doubleLicensePlateB = a.doubleLicensePlate ? 'Sí' : 'No'

        return doubleLicensePlateA > doubleLicensePlateB ? 1 : -1
      }
    },
    {
      id: 'isFull',
      columnName: '¿Va llena?',
      filterFunc: (route) => route.isFull ? 'Si' : 'No',
      render: (route) => route.isFull ? 'Si' : 'No',
      sortFunc: (a, b) => {
        const isFullA = a.isFull ? 'Sí' : 'No'
        const isFullB = a.isFull ? 'Sí' : 'No'

        return isFullA > isFullB ? 1 : -1
      }
    },
    {
      id: 'material',
      columnName: 'Tipo de Material',
      filterFunc: (route) => route.materialType,
      render: (route) => route.materialType
    },
    {
      id: 'materialAmount',
      columnName: 'Cantidad de Material',
      filterFunc: (route) => route.materialAmount,
      render: (route) => route.materialAmount
    },
    {
      id: 'startPernocte',
      columnName: 'Inicio Pernocte',
      filterFunc: (route) => route.startPernocte ? formatDateTime(route.startPernocte) : 'No',
      render: (route) => route.startPernocte ? formatDateTime(route.startPernocte) : 'No'
    },
    {
      id: 'endPernocte',
      columnName: 'Fin Pernocte',
      filterFunc: (route) => route.endPernocte ? formatDateTime(route.endPernocte) : 'No',
      render: (route) => route.endPernocte ? formatDateTime(route.endPernocte) : 'No'
    },
    {
      id: 'pernocteTime',
      columnName: 'Tiempo de Pernocte (min)',
      filterFunc: (route) => {
        if (route.startPernocte === null || route.endPernocte === null) return 'Pernocte no terminado'

        const date1 = moment(route.startPernocte)
        const date2 = moment(route.endPernocte)

        return Math.ceil(date2.diff(date1, 'minutes')).toString()
      },
      render: (route) => {
        if (route.startPernocte === null || route.endPernocte === null) return 'Pernocte no terminado'

        const date1 = moment(route.startPernocte)
        const date2 = moment(route.endPernocte)

        return Math.ceil(date2.diff(date1, 'minutes')).toString()
      }
    },
    {
      id: 'pernocteLocation',
      columnName: 'Ubicación de Pernocte',
      filterFunc: (route) => route.pernocteLocation ?? 'No realizada',
      render: (route) => {
        if (route.pernocteLocation === null) return 'No realizada'

        return (
          <p
            className='hover:text-red cursor-pointer'
            onClick={() => { goToGoogleMapsPage(route.pernocteLocation ?? '') }}
          >
            {route.pernocteLocation}
          </p>
        )
      }
    }

  ]

  const PAGINATION = [5, 10, 15, 20]

  const onRowClick = (route: Route): void => {
    navigate(`/detalle-recorrido?id=${route.id}`)
  }

  const ROUTE_ACTIONS: Array<Action<Route>> = [
    {
      icon: () => (
        <Button color='primary'>Ver detalle</Button>
      ),
      actionFunc: onRowClick
    }
  ]

  return (
    <main>
      {
        routes.length > 0
          ? <Table setDataFiltered={setRoutesFiltered} columns={ROUTE_COLUMNS} data={routes} pagination={PAGINATION} showFilter={showFilter} actions={ROUTE_ACTIONS} />
          : <p className='text-center uppercase font-semibold text-red mt-10'>No hay recorridos en ese rango de fecha</p>
      }
    </main>
  )
}

export default RoutesTable
