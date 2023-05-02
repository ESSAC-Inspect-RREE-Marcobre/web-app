import React, { useContext, type ReactElement } from 'react'
import { toast } from 'react-toastify'
import Table, { type Action, type Column } from '@/shared/ui/components/table/Table'
import DeleteIcon from '@/shared/ui/assets/icons/DeleteIcon'
import EditIcon from '@/shared/ui/assets/icons/EditIcon'
import EyeIcon from '@/shared/ui/assets/icons/EyeIcon'
import { VehiclesService } from '@/vehicles/services/vehicles.service'
import { type Vehicle } from '@/vehicles/models/vehicle.interface'
import { VehicleContext } from '../contexts/VehicleContext'

interface VehiclesTableProps {
  toggleShowForm: () => void
  toggleShowDetail: () => void
  areCarts: boolean
}

const VehiclesTable = ({ areCarts, toggleShowForm, toggleShowDetail }: VehiclesTableProps): ReactElement => {
  const { toastId, vehicles, setVehicleForm, removeVehicle, setSelectedVehicle } = useContext(VehicleContext)

  const handleRemove = (vehicle: Vehicle): void => {
    const vehiclesService = new VehiclesService()
    const result = confirm(`Estás seguro que quieres eliminar el vehículo: ${vehicle.licensePlate}`)
    if (!result) return

    const id = vehicle.id
    void vehiclesService.remove(vehicle.licensePlate)
      .then(() => {
        removeVehicle(id)
        setSelectedVehicle(null)
        setVehicleForm(null)
        toast('Tipo de vehículo eliminado correctamente', { toastId, type: 'success' })
      })
      .catch((error) => {
        const { message } = error.data
        toast(message, { toastId, type: 'error' })
      })
  }

  const handleUpdate = (vehicle: Vehicle): void => {
    setVehicleForm(vehicle)
    toggleShowForm()
  }

  const handleView = (vehicle: Vehicle): void => {
    setSelectedVehicle(vehicle)
    toggleShowDetail()
  }

  const VEHICLE_COLUMNS: Array<Column<Vehicle>> = [
    {
      id: 'licensePlate',
      columnName: 'Placa',
      filterFunc: (vehicle) => vehicle.licensePlate,
      sortFunc: (a, b) => a.licensePlate > b.licensePlate ? 1 : -1,
      render: (vehicle) => vehicle.licensePlate
    },
    {
      id: 'provider',
      columnName: 'Proveedor',
      filterFunc: (vehicle) => vehicle.provider,
      sortFunc: (a, b) => a.provider > b.provider ? 1 : -1,
      render: (vehicle) => vehicle.provider
    },
    {
      id: 'company',
      columnName: 'Empresa',
      filterFunc: (vehicle) => vehicle.company,
      sortFunc: (a, b) => a.company > b.company ? 1 : -1,
      render: (vehicle) => vehicle.company
    },
    {
      id: 'imei',
      columnName: 'Imei',
      filterFunc: (vehicle) => vehicle.imei.length > 0 ? vehicle.imei : 'Imei registrado',
      sortFunc: (a, b) => {
        const imeiA = a.imei.length > 0 ? a.imei : 'Imei registrado'
        const imeiB = b.imei.length > 0 ? b.imei : 'Imei registrado'
        return imeiA > imeiB ? 1 : -1
      },
      render: (vehicle) => vehicle.imei.length > 0 ? vehicle.imei : 'Imei registrado'
    },
    {
      id: 'lastMaintenance',
      columnName: 'Último Mantenimiento',
      filterFunc: (vehicle) => {
        if (!vehicle.lastMaintenance) {
          return 'No registrado'
        }
        return vehicle.lastMaintenance.trim().length > 0 ? new Date(vehicle.lastMaintenance).toDateString() : 'No registrado'
      },
      sortFunc: (a, b) => {
        const aLastMaintenance = a.lastMaintenance ?? 'No registrado'
        const bLastMaintenance = b.lastMaintenance ?? 'No registrado'

        if (isNaN(Date.parse(aLastMaintenance)) && isNaN(Date.parse(bLastMaintenance))) {
          return aLastMaintenance > bLastMaintenance ? 1 : -1
        }

        return new Date(aLastMaintenance).getTime() - new Date(bLastMaintenance).getTime()
      },
      render: (vehicle) => {
        if (vehicle.lastMaintenance === null) {
          return 'No registrado'
        }

        if (vehicle.lastMaintenance.length === 0) {
          return 'No registrado'
        }

        return new Date(vehicle.lastMaintenance).toDateString()
      }
    },
    {
      id: 'soatExpiration',
      columnName: 'F. Venc. Soat',
      filterFunc: (vehicle) => new Date(vehicle.soatExpiration).toDateString(),
      sortFunc: (a, b) => new Date(a.soatExpiration).getTime() - new Date(b.soatExpiration).getTime(),
      render: (vehicle) => new Date(vehicle.soatExpiration).toDateString()
    },
    {
      id: 'technicalReviewExpiration',
      columnName: 'F. Venc. Revisión Técnica',
      filterFunc: (vehicle) => new Date(vehicle.technicalReviewExpiration).toDateString(),
      sortFunc: (a, b) => {
        const aTime = new Date(a.technicalReviewExpiration).getTime()
        const bTime = new Date(b.technicalReviewExpiration).getTime()

        return aTime - bTime
      },
      render: (vehicle) => new Date(vehicle.technicalReviewExpiration).toDateString()
    },
    {
      id: 'vehicleType',
      columnName: 'Tipo de vehículo',
      filterFunc: (vehicle) => vehicle.vehicleType.name,
      sortFunc: (a, b) => a.vehicleType.name > b.vehicleType.name ? 1 : -1,
      render: (vehicle) => vehicle.vehicleType.name.toUpperCase()
    },
    {
      id: 'brand',
      columnName: 'Marca',
      filterFunc: (vehicle) => vehicle.brand,
      sortFunc: (a, b) => a.brand > b.brand ? 1 : -1,
      render: (vehicle) => vehicle.brand
    },
    {
      id: 'model',
      columnName: 'Modelo',
      filterFunc: (vehicle) => vehicle.model,
      sortFunc: (a, b) => a.model > b.model ? 1 : -1,
      render: (vehicle) => vehicle.model
    }
  ]

  const PAGINATION = [5, 10, 20]

  const VEHICLE_ACTIONS: Array<Action<Vehicle>> = [
    {
      icon: () => (<EditIcon className='cursor-pointer w-5 h-5' />),
      actionFunc: handleUpdate
    },
    {
      icon: () => (<DeleteIcon className='cursor-pointer w-5 h-5 text-red' />),
      actionFunc: handleRemove
    },
    {
      icon: () => (<EyeIcon className='cursor-pointer w-5 h-5 ' />),
      actionFunc: handleView
    }
  ]
  return (
    <main>
      {
        vehicles.length > 0
          ? (
            <Table
              data={vehicles}
              columns={VEHICLE_COLUMNS}
              pagination={PAGINATION}
              actions={VEHICLE_ACTIONS}
            />
            )
          : <p>No hay {areCarts ? 'carretas' : 'vehículos'} registrados</p>
      }

    </main>
  )
}

export default VehiclesTable
